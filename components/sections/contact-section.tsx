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
import { useLanguage } from "@/components/layout/language-provider";

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
  const { language } = useLanguage();

  const ariaLabel =
    language === "en"
      ? "Book your free on-site estimate"
      : "Zatražite besplatnu procjenu na licu mjesta";

  return (
    <SectionShell
      id="contact"
      aria-label={ariaLabel}
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
  const { language } = useLanguage();

  const headingText =
    language === "en"
      ? "Book your free on-site estimate."
      : "Zatražite besplatnu procjenu na licu mjesta.";

  const introText =
    language === "en"
      ? "Share a bit about your home and what is not working today. We will come back with a practical plan, a clear quote, and a realistic timeline so you can stop worrying about leaks, drafts, or unfinished projects."
      : "Podijelite nekoliko detalja o svom domu i onome što danas ne funkcionira. Javit ćemo vam se s praktičnim planom, jasnom ponudom i realnim rokovima kako biste prestali brinuti o curenju, propuhu ili nedovršenim radovima.";

  const projectLabel =
    language === "en"
      ? "Tell us about your project."
      : "Recite nam nešto o svom projektu.";

  const projectPlaceholder =
    language === "en"
      ? "For example: a pergola, facade refresh, balcony or shutter repairs, roofing or other exterior work."
      : "Na primjer: pergola, obnova fasade, popravak balkona ili grilja, krovopokrivački radovi ili drugi vanjski radovi.";

  const projectHelper =
    language === "en"
      ? "The more detail you share, the easier it is for us to prepare a realistic estimate for your pergola, facade, roofing or other exterior work."
      : "Što više detalja podijelite, to nam je lakše pripremiti realnu procjenu za vašu pergolu, fasadu, krov ili druge vanjske radove.";

  const emailLabel =
    language === "en"
      ? "Visitors email address"
      : "Vaša email adresa";

  const emailPlaceholder =
    language === "en" ? "you@example.com" : "vi@primjer.com";

  const descriptionRequiredMessage =
    language === "en"
      ? "Please tell us a bit about your project so we can prepare your estimate."
      : "Molimo, napišite nam ukratko o svom projektu kako bismo mogli pripremiti vašu procjenu.";

  const descriptionMinLengthMessage =
    language === "en"
      ? `Please provide at least ${MIN_PROJECT_DESCRIPTION_LENGTH} characters so we can prepare a realistic estimate.`
      : `Molimo upišite barem ${MIN_PROJECT_DESCRIPTION_LENGTH} znakova kako bismo mogli pripremiti realnu procjenu.`;

  const emailRequiredMessage =
    language === "en"
      ? "Please enter your email address."
      : "Molimo unesite svoju email adresu.";

  const emailInvalidMessage =
    language === "en"
      ? "Please enter a valid email address so we can reach you."
      : "Molimo unesite valjanu email adresu kako bismo vas mogli kontaktirati.";

  const successFallbackMessage =
    language === "en"
      ? "Thank you. We have received your request and will follow up with a practical plan and clear quote."
      : "Hvala vam. Zaprimili smo vaš upit i javit ćemo vam se s praktičnim planom i jasnom ponudom.";

  const genericErrorFallbackMessage =
    language === "en"
      ? "Something went wrong while submitting your request. Please try again in a moment."
      : "Došlo je do pogreške prilikom slanja vašeg upita. Molimo pokušajte ponovno za trenutak.";

  const networkErrorMessage =
    language === "en"
      ? "We could not reach the server. Please check your connection and try again."
      : "Ne možemo se povezati s poslužiteljem. Provjerite svoju vezu i pokušajte ponovno.";

  const successTitle =
    language === "en" ? "Request received" : "Upit zaprimljen";

  const errorTitle =
    language === "en" ? "Something went wrong" : "Došlo je do pogreške";

  const submitIdleLabel = language === "en" ? "Send" : "Pošalji";
  const submitLoadingLabel = language === "en" ? "Sending..." : "Šaljemo...";

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
          message: data.message ?? successFallbackMessage,
        });
        form.reset();
      } else {
        setStatus({
          type: "error",
          message: data.message ?? genericErrorFallbackMessage,
        });
      }
    } catch {
      setStatus({
        type: "error",
        message: networkErrorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          {headingText}
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground">
          {introText}
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
              required: descriptionRequiredMessage,
              validate: (value) =>
                isValidProjectDescription(value) ||
                descriptionMinLengthMessage,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{projectLabel}</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder={projectPlaceholder}
                    className="min-h-32 resize-y"
                  />
                </FormControl>
                <p className="text-xs text-muted-foreground">
                  {projectHelper}
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            rules={{
              required: emailRequiredMessage,
              validate: (value) =>
                isValidEmail(value) || emailInvalidMessage,
            }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{emailLabel}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    autoComplete="email"
                    placeholder={emailPlaceholder}
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
                  <AlertTitle>{successTitle}</AlertTitle>
                  <AlertDescription>{status.message}</AlertDescription>
                </Alert>
              ) : (
                <Alert variant="destructive">
                  <AlertTitle>{errorTitle}</AlertTitle>
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
              {isSubmitting ? submitLoadingLabel : submitIdleLabel}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

function ContactInfo() {
  const { language } = useLanguage();

  const headingText =
    language === "en" ? "How to reach us" : "Kako do nas";

  const introText =
    language === "en"
      ? "Prefer to talk things through before filling in the form? That is fine too."
      : "Radije biste prvo sve prošli razgovorom prije nego ispunite obrazac? I to je sasvim u redu.";

  const addressLabel = language === "en" ? "Address" : "Adresa";
  const oibLabel = "OIB";
  const mbsLabel = "MBS";
  const phoneLabel = language === "en" ? "Phone" : "Telefon";
  const emailLabel = "Email";
  const hoursLabel = language === "en" ? "Hours" : "Radno vrijeme";

  const addressValue =
    language === "en"
      ? "Dimi Mont d.o.o, Kralja Tomislava 118A, 51260, Crikvenica, Hrvatska"
      : "Dimi Mont d.o.o., Kralja Tomislava 118A, 51260 Crikvenica, Hrvatska";

  const hoursValue =
    language === "en"
      ? "Mon–Fri, 09:00–17:00 CET"
      : "Pon–Pet, 09:00–17:00 CET";

  return (
    <aside className="space-y-4">
      <h3 className="text-lg sm:text-xl font-semibold text-foreground">
        {headingText}
      </h3>
      <p className="text-sm sm:text-base text-muted-foreground">
        {introText}
      </p>

      <dl className="space-y-3 text-sm sm:text-base text-muted-foreground">
        <div>
          <dt className="font-medium text-foreground">{addressLabel}</dt>
          <dd>{addressValue}</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">{oibLabel}</dt>
          <dd>06153067918</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">{mbsLabel}</dt>
          <dd>040486468</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">{phoneLabel}</dt>
          <dd>+385 (0)91 000 0000</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">{emailLabel}</dt>
          <dd>hello@dimi-mont.example.com</dd>
        </div>
        <div>
          <dt className="font-medium text-foreground">{hoursLabel}</dt>
          <dd>{hoursValue}</dd>
        </div>
      </dl>
    </aside>
  );
}