"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { SectionShell } from "@/components/layout/section-shell";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  MIN_PROJECT_DESCRIPTION_LENGTH,
  isValidEmail,
  isValidProjectDescription,
} from "@/lib/validations";

type ContactFormValues = {
  projectDescription: string;
  email: string;
};

type SubscribeResponse = {
  success: boolean;
  message: string;
  errorCode?: string;
};

type FormStatusState = {
  type: "idle" | "success" | "error";
  message?: string;
};

export function ContactSection() {
  return (
    <SectionShell
      id="contact"
      aria-label="Book your free on-site estimate"
      className="bg-background"
    >
      <div className="grid gap-10 md:grid-cols-2 md:gap-12">
        <ContactForm />
        <ContactInfo />
      </div>
    </SectionShell>
  );
}

function ContactForm() {
  const form = useForm<ContactFormValues>({
    defaultValues: {
      projectDescription: "",
      email: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatusState>({ type: "idle" });

  async function onSubmit(values: ContactFormValues) {
    setIsSubmitting(true);
    setStatus({ type: "idle" });

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          projectDescription: values.projectDescription,
        }),
      });

      const data: SubscribeResponse = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: "success",
          message:
            data.message ??
            "Thank you. We have received your request and will follow up with a practical plan and clear quote.",
        });
        form.reset();
      } else {
        setStatus({
          type: "error",
          message:
            data.message ??
            "Something went wrong while submitting your request. Please try again in a moment.",
        });
      }
    } catch {
      setStatus({
        type: "error",
        message:
          "We could not reach the server. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Book your free on-site estimate.
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          Share a bit about your home and what is not working today. We
          will come back with a practical plan, a clear quote, and a realistic
          timeline so you can stop worrying about leaks, drafts, or unfinished
          projects.
        </p>
      </div>

      <Form {...form}>
        <form
          className="space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
          noValidate
        >
          <FormField
            control={form.control}
            name="projectDescription"
            rules={{
              required:
                "Please tell us a bit about your project so we can prepare your estimate.",
              validate: (value) =>
                isValidProjectDescription(value) ||
                `Please provide at least ${MIN_PROJECT_DESCRIPTION_LENGTH} characters so we can prepare a realistic estimate.`,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tell us about your project.</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="For example: a pergola, facade refresh, balcony or shutter repairs, roofing or other exterior work."
                    className="min-h-32 resize-y"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  The more detail you share, the easier it is for us to prepare
                  a realistic estimate for your pergola, facade, roofing or
                  other exterior work.
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Please enter your email address.",
              validate: (value) =>
                isValidEmail(value) ||
                "Please enter a valid email address so we can reach you.",
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Visitors email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {status.type !== "idle" && status.message && (
            <div aria-live="polite">
              {status.type === "success" ? (
                <Alert variant="default">
                  <AlertTitle>Request received</AlertTitle>
                  <AlertDescription>{status.message}</AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertTitle>Something went wrong</AlertTitle>
                  <AlertDescription>{status.message}</AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <div className="pt-2">
            <Button
              type="submit"
              className="min-w-[10rem] shadow-lg motion-safe:transition-transform motion-safe:duration-200 motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-xl"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function ContactInfo() {
  return (
    <aside className="space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-foreground">
        How to reach us
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground">
        Prefer to talk things through before filling in the form? That is
        fine too.
      </p>

      <dl className="space-y-3 text-sm sm:text-base text-muted-foreground">
        <div>
          <dt className="font-medium text-foreground">Address</dt>
          <dd>Dimimont Home-Care, Primorsko-goranska, Croatia</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Phone</dt>
          <dd>+385 (0)91 000 0000</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Email</dt>
          <dd>hello@dimimont-home-care.example.com</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">Hours</dt>
          <dd>Mon–Fri, 09:00–17:00 CET</dd>
        </div>
      </dl>
    </aside>
  );
}