import { NextResponse } from "next/server";

import {
  MIN_PROJECT_DESCRIPTION_LENGTH,
  isValidEmail,
  isValidProjectDescription,
} from "@/lib/validations";
import {
  subscribeToAudience,
  type SubscribeErrorCode,
  type SubscribeResult,
} from "@/lib/mailchimp";

type SubscribeRequest = {
  email: string;
  projectDescription: string;
  locale?: string;
};

type SubscribeResponse = {
  success: boolean;
  message: string;
  errorCode?: SubscribeErrorCode | "invalid_body" | "invalid_description";
};

function json(
  body: SubscribeResponse,
  status?: number,
): NextResponse<SubscribeResponse> {
  return NextResponse.json(body, status ? { status } : undefined);
}

function parseRequestBody(value: unknown): SubscribeRequest | null {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return null;
  }

  const body = value as Partial<SubscribeRequest>;

  if (typeof body.email !== "string") {
    return null;
  }

  if (typeof body.projectDescription !== "string") {
    return null;
  }

  const locale =
    typeof body.locale === "string" ? body.locale : undefined;

  return {
    email: body.email,
    projectDescription: body.projectDescription,
    locale,
  };
}

export async function POST(req: Request): Promise<NextResponse<SubscribeResponse>> {
  let parsed: SubscribeRequest | null = null;

  try {
    const raw = await req.json();
    parsed = parseRequestBody(raw);
  } catch {
    parsed = null;
  }

  if (!parsed) {
    return json(
      {
        success: false,
        message: "Invalid request body.",
        errorCode: "invalid_body",
      },
      400,
    );
  }

  const { email, projectDescription, locale } = parsed;

  // Server-side validation using shared helpers
  if (!isValidEmail(email)) {
    return json(
      {
        success: false,
        message: "Please provide a valid email address.",
        errorCode: "invalid_email",
      },
      400,
    );
  }

  if (!isValidProjectDescription(projectDescription)) {
    return json(
      {
        success: false,
        message: `Please provide at least ${MIN_PROJECT_DESCRIPTION_LENGTH} characters so we can prepare a realistic estimate.`,
        errorCode: "invalid_description",
      },
      400,
    );
  }

  // Delegate to Mailchimp helper (server-side only)
  let result: SubscribeResult;

  try {
    result = await subscribeToAudience({
      email,
      projectDescription,
      locale,
    });
  } catch {
    return json(
      {
        success: false,
        message:
          "We could not complete your subscription right now. Please try again later.",
        errorCode: "server_error",
      },
      500,
    );
  }

  // Map Mailchimp helper result directly through
  if (!result.success) {
    const statusCode =
      result.errorCode === "config_error" ? 500 : 502;

    return json(
      {
        success: false,
        message: result.message,
        errorCode: result.errorCode ?? "server_error",
      },
      statusCode,
    );
  }

  return json(
    {
      success: true,
      message: result.message,
    },
    200,
  );
}