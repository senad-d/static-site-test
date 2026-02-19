import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";
import { z } from "zod";

export const runtime = "nodejs";

const payloadSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  language: z.enum(["en", "hr"]).optional(),
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = payloadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide a valid email and project details." },
      { status: 400 }
    );
  }

  const { email, message, language } = parsed.data;
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const server = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !server || !audienceId) {
    return NextResponse.json(
      { error: "Mailchimp is not configured." },
      { status: 500 }
    );
  }

  mailchimp.setConfig({ apiKey, server });

  try {
    await mailchimp.lists.addListMember(audienceId, {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        MESSAGE: message,
        LANGUAGE: language ?? "",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const mailchimpError = error as {
      response?: { body?: { title?: string } };
    };

    if (mailchimpError?.response?.body?.title === "Member Exists") {
      return NextResponse.json({ ok: true, alreadySubscribed: true });
    }

    return NextResponse.json(
      { error: "We could not submit your request right now." },
      { status: 502 }
    );
  }
}
