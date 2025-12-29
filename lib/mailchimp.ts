import mailchimp from "@mailchimp/mailchimp_marketing";
import crypto from "crypto";

const {
  MAILCHIMP_API_KEY,
  MAILCHIMP_SERVER_PREFIX,
  MAILCHIMP_AUDIENCE_ID,
} = process.env;

type SubscribeArgs = {
  email: string;
  projectDescription: string;
  locale?: string;
};

export type SubscribeErrorCode =
  | "config_error"
  | "invalid_email"
  | "already_subscribed"
  | "server_error";

export type SubscribeResult = {
  success: boolean;
  message: string;
  errorCode?: SubscribeErrorCode;
};

function isMailchimpConfigured(): boolean {
  return Boolean(
    MAILCHIMP_API_KEY &&
      MAILCHIMP_SERVER_PREFIX &&
      MAILCHIMP_AUDIENCE_ID,
  );
}

function getSubscriberHash(email: string): string {
  return crypto
    .createHash("md5")
    .update(email.trim().toLowerCase())
    .digest("hex");
}

function initMailchimp() {
  if (!isMailchimpConfigured()) {
    throw new Error("Mailchimp is not configured via environment variables.");
  }

  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY!,
    server: MAILCHIMP_SERVER_PREFIX!,
  });
}

type MailchimpResponseBody = {
  title?: string;
  name?: string;
  error?: string;
  detail?: string;
  message?: string;
};

type MailchimpErrorLike = MailchimpResponseBody & {
  response?: {
    body?: unknown;
  };
};

/**
 * Safely extracts a Mailchimp-style error body from an unknown error.
 */
function extractMailchimpError(error: unknown): MailchimpResponseBody {
  const candidate = error as MailchimpErrorLike;

  if (candidate.response && candidate.response.body) {
    return (candidate.response.body as MailchimpResponseBody) ?? {};
  }

  if (
    candidate.title ||
    candidate.name ||
    candidate.error ||
    candidate.detail ||
    candidate.message
  ) {
    return {
      title: candidate.title,
      name: candidate.name,
      error: candidate.error,
      detail: candidate.detail,
      message: candidate.message,
    };
  }

  return {};
}

/**
 * subscribeToAudience
 *
 * Server-side helper that upserts a subscriber into the configured Mailchimp audience.
 * - Never call this from client components.
 * - Requires MAILCHIMP_API_KEY, MAILCHIMP_SERVER_PREFIX, MAILCHIMP_AUDIENCE_ID.
 */
export async function subscribeToAudience(
  args: SubscribeArgs,
): Promise<SubscribeResult> {
  if (!isMailchimpConfigured()) {
    return {
      success: false,
      message:
        "Subscription service is not fully configured. Please try again later.",
      errorCode: "config_error",
    };
  }

  try {
    initMailchimp();

    const { email, projectDescription, locale } = args;
    const listId = MAILCHIMP_AUDIENCE_ID!;
    const subscriberHash = getSubscriberHash(email);

    const mergeFields: Record<string, string | undefined> = {
      // Custom merge fields must exist in the Mailchimp audience configuration.
      PROJECT_DESC: projectDescription,
      LOCALE: locale,
    };

    await mailchimp.lists.setListMember(listId, subscriberHash, {
      email_address: email,
      status_if_new: "subscribed",
      status: "subscribed",
      merge_fields: mergeFields,
      tags: ["DimiMont-site"],
    });

    return {
      success: true,
      message:
        "You have been added to the DimiMont mailing list. We will follow up with your free estimate details shortly.",
    };
  } catch (error: unknown) {
    const mcError = extractMailchimpError(error);

    const rawTitle: string | undefined =
      mcError.title ?? mcError.name ?? mcError.error;
    const rawDetail: string | undefined =
      mcError.detail ?? mcError.message;

    const title = rawTitle?.toLowerCase() ?? "";

    if (title.includes("invalid") && title.includes("resource")) {
      return {
        success: false,
        message:
          "The email address appears to be invalid. Please check it and try again.",
        errorCode: "invalid_email",
      };
    }

    if (
      title.includes("member exists") ||
      title.includes("already a list member")
    ) {
      return {
        success: true,
        message:
          "You are already subscribed. We will use your existing subscription details to follow up about your estimate.",
        errorCode: "already_subscribed",
      };
    }

    // Log full error server-side for debugging; never expose details to client.
    console.error("[Mailchimp] Subscription error:", error);

    return {
      success: false,
      message:
        rawDetail ??
        "We could not complete your subscription right now. Please try again later.",
      errorCode: "server_error",
    };
  }
}