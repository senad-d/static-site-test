"use client";

import * as React from "react";
import Image from "next/image";
import { content } from "@/lib/content";
import { SiteHeader } from "@/components/layout/site-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ChevronDown, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";

type Language = "en" | "hr";

const languageStorageKey = "dimimont-language";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function SiteShell() {
  const [language, setLanguage] = React.useState<Language>("hr");

  React.useEffect(() => {
    const stored = window.localStorage.getItem(languageStorageKey);
    if (stored === "en" || stored === "hr") {
      setLanguage(stored);
      return;
    }
    if (navigator.language.toLowerCase().startsWith("hr")) {
      setLanguage("hr");
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(languageStorageKey, language);
    document.documentElement.lang = language;
  }, [language]);

  React.useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!elements.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, activeObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            activeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [language]);

  const copy = content[language];

  return (
    <div className="bg-background text-foreground">
      <SiteHeader
        language={language}
        onLanguageChange={setLanguage}
        ctaLabel={copy.nav.cta}
        languageLabel={copy.nav.language}
        settingsLabel={copy.nav.settings}
        themeLabel={copy.nav.themeLabel}
        themeOptions={copy.nav.themeOptions}
      />

      <main>
        <section
          id="hero"
          className="relative flex min-h-[100svh] items-center overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src={`${basePath}/assets/hero.jpg`}
              alt=""
              fill
              priority
              sizes="(min-width: 768px) 100vw"
              className="hidden object-cover md:block"
            />
            <Image
              src={`${basePath}/assets/hero-mobile.jpg`}
              alt=""
              fill
              priority
              sizes="(max-width: 767px) 100vw"
              className="object-cover md:hidden"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
          <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-primary/80">
                <span>Dimimont</span>
                <span className="text-primary/40">/</span>
                <span>Home-Care</span>
              </div>
              <h1
                className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl reveal-on-scroll"
                data-reveal
              >
                {copy.hero.headline}
              </h1>
              <p
                className="mt-5 max-w-xl text-base text-slate-200/90 sm:text-lg reveal-on-scroll"
                data-reveal
                style={{ transitionDelay: "80ms" }}
              >
                {copy.hero.subheadline}
              </p>
              <div
                className="mt-8 flex flex-wrap items-center gap-4 reveal-on-scroll"
                data-reveal
                style={{ transitionDelay: "140ms" }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-primary text-primary-foreground shadow-lg transition-shadow hover:shadow-xl"
                >
                  <a href="#contact">{copy.hero.cta}</a>
                </Button>
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-slate-300/70">
                  <ShieldCheck className="size-4 text-primary/80" />
                  <span>{copy.hero.trustNote}</span>
                </div>
              </div>
              <div className="mt-10 flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-slate-300/70">
                {copy.hero.regions.map((region) => (
                  <span
                    key={region}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1"
                  >
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="about"
          className="relative overflow-hidden bg-background py-24"
        >
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center dark:hidden"
              style={{
                backgroundImage: `url(${basePath}/assets/about-bg-light.svg)`,
              }}
            />
            <div
              className="absolute inset-0 hidden bg-cover bg-center dark:block"
              style={{
                backgroundImage: `url(${basePath}/assets/about-bg-dark.svg)`,
              }}
            />
          </div>
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
            <div>
              <h2
                className="text-3xl font-semibold text-foreground reveal-on-scroll"
                data-reveal
              >
                {copy.about.headline}
              </h2>
              <p
                className="mt-5 text-base text-muted-foreground sm:text-lg reveal-on-scroll"
                data-reveal
                style={{ transitionDelay: "80ms" }}
              >
                {copy.about.body}
              </p>
            </div>
            <div className="grid gap-4">
              {copy.about.benefits.map((benefit, index) => (
                <Card
                  key={benefit.title}
                  className="bg-card/90 border-border/60 reveal-on-scroll transition-shadow hover:shadow-lg"
                  data-reveal
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-lg text-foreground">
                      {benefit.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    {benefit.description}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="bg-projects py-24">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="max-w-2xl">
              <h2
                className="text-3xl font-semibold text-foreground reveal-on-scroll"
                data-reveal
              >
                {copy.projects.headline}
              </h2>
              <p
                className="mt-4 text-base text-muted-foreground sm:text-lg reveal-on-scroll"
                data-reveal
                style={{ transitionDelay: "80ms" }}
              >
                {copy.projects.subheadline}
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {copy.projects.items.map((project, index) => (
                <Card
                  key={project.title}
                  className="border-border/60 bg-card/90 shadow-xl reveal-on-scroll transition-shadow hover:shadow-2xl"
                  data-reveal
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">
                      {project.title}
                    </CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Carousel
                      opts={{ align: "start", loop: true }}
                      className="w-full group"
                    >
                      <CarouselContent>
                        {project.images.map((src, imageIndex) => {
                          const imageSrc = `${basePath}${src}`;
                          return (
                            <CarouselItem
                              key={`${project.title}-${src}`}
                            >
                              <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/30 sm:h-60">
                                <Image
                                  src={imageSrc}
                                  alt={`${project.title} gallery image ${imageIndex + 1}`}
                                  fill
                                  className="object-cover"
                                  sizes="(min-width: 1024px) 50vw, 100vw"
                                />
                              </div>
                            </CarouselItem>
                          );
                        })}
                      </CarouselContent>
                      <CarouselPrevious className="hidden sm:flex left-4 top-1/2 size-10 -translate-y-1/2 border-white/30 bg-black/70 text-white shadow-lg backdrop-blur opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-primary hover:text-primary-foreground [&_svg]:size-5" />
                      <CarouselNext className="hidden sm:flex right-4 left-auto top-1/2 size-10 -translate-y-1/2 border-white/30 bg-black/70 text-white shadow-lg backdrop-blur opacity-0 transition-opacity duration-200 group-hover:opacity-100 focus-visible:opacity-100 hover:bg-primary hover:text-primary-foreground [&_svg]:size-5" />
                    </Carousel>

                    <details
                      className="group rounded-2xl border border-white/10 bg-black/10"
                      data-animate
                    >
                      <summary className="flex cursor-pointer items-center justify-between gap-4 px-4 py-3 text-sm font-semibold text-foreground list-none [&::-webkit-details-marker]:hidden">
                        <span>{copy.projects.detailsLabel}</span>
                        <ChevronDown className="size-4 text-primary/80 transition-transform group-open:rotate-180" />
                      </summary>
                      <div className="details-content space-y-4 px-4 pb-4 text-sm text-muted-foreground">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                            Objectives
                          </p>
                          <p className="mt-2">{project.objectives}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                            Approach
                          </p>
                          <p className="mt-2">{project.approach}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
                            Results
                          </p>
                          <p className="mt-2">{project.results}</p>
                        </div>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden bg-background py-24 scroll-mt-5 sm:scroll-mt-5"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rotate-180"
          >
            <div
              className="absolute inset-0 bg-cover bg-center dark:hidden"
              style={{
                backgroundImage: `url(${basePath}/assets/about-bg-light.svg)`,
              }}
            />
            <div
              className="absolute inset-0 hidden bg-cover bg-center dark:block"
              style={{
                backgroundImage: `url(${basePath}/assets/about-bg-dark.svg)`,
              }}
            />
          </div>
          <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div>
              <h2
                className="text-3xl font-semibold text-foreground reveal-on-scroll"
                data-reveal
              >
                {copy.contact.headline}
              </h2>
              <p
                className="mt-4 text-base text-muted-foreground sm:text-lg reveal-on-scroll"
                data-reveal
                style={{ transitionDelay: "80ms" }}
              >
                {copy.contact.subheadline}
              </p>
              <ContactForm language={language} />
            </div>
            <Card
              className="h-fit border-border/60 bg-card/80 reveal-on-scroll transition-shadow hover:shadow-lg"
              data-reveal
              style={{ transitionDelay: "140ms" }}
            >
              <CardHeader>
                <CardTitle className="text-lg text-foreground">
                  {copy.contact.info.headline}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {copy.contact.info.subheadline}
                </p>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 text-primary/80" />
                  <span>{copy.contact.info.address}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-0.5 size-4 text-primary/80" />
                  <span>{copy.contact.info.phone}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 text-primary/80" />
                  <span>{copy.contact.info.email}</span>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-4 text-primary/80" />
                  <span>{copy.contact.info.hours}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground sm:flex-row">
          <span>{copy.footer.copyright}</span>
          <a
            href="https://www.facebook.com"
            className="text-primary/80 transition-colors hover:text-primary"
          >
            {copy.footer.facebook}
          </a>
        </div>
      </footer>
    </div>
  );
}

function ContactForm({ language }: { language: Language }) {
  const copy = content[language].contact.form;
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errors, setErrors] = React.useState<{ email?: string; message?: string }>(
    {}
  );
  const [formData, setFormData] = React.useState({ email: "", message: "" });

  const errorCopy = {
    en: "Please add a valid email and at least a few details about the project.",
    hr: "Unesite ispravnu e-mail adresu i barem nekoliko detalja o projektu.",
  } as const;

  const apiErrorCopy = {
    en: "We could not submit your request right now. Please try again soon.",
    hr: "Trenutno ne možemo poslati vaš upit. Pokušajte ponovno uskoro.",
  } as const;

  const errorTitleCopy = {
    en: "Unable to send",
    hr: "Neuspjelo slanje",
  } as const;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: { email?: string; message?: string } = {};

    if (!emailPattern.test(formData.email)) {
      nextErrors.email = errorCopy[language];
    }
    if (formData.message.trim().length < 10) {
      nextErrors.message = errorCopy[language];
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          message: formData.message,
          language,
        }),
      });

      if (!response.ok) {
        setStatus("error");
        return;
      }

      setStatus("success");
      setFormData({ email: "", message: "" });
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form
      className="mt-8 space-y-6 reveal-on-scroll"
      data-reveal
      style={{ transitionDelay: "140ms" }}
      onSubmit={handleSubmit}
    >
      <div className="space-y-2">
        <Label htmlFor="message">{copy.messageLabel}</Label>
        <p className="text-xs text-muted-foreground">{copy.messageHint}</p>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, message: event.target.value }));
            if (errors.message) {
              setErrors((prev) => ({ ...prev, message: undefined }));
            }
            if (status === "error") {
              setStatus("idle");
            }
          }}
          className="min-h-[140px] border-white/10 bg-card/80"
          aria-invalid={Boolean(errors.message)}
          required
          minLength={10}
          maxLength={2000}
        />
        {errors.message ? (
          <p className="text-xs text-destructive">{errors.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">{copy.emailLabel}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(event) => {
            setFormData((prev) => ({ ...prev, email: event.target.value }));
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: undefined }));
            }
            if (status === "error") {
              setStatus("idle");
            }
          }}
          className="border-white/10 bg-card/80"
          aria-invalid={Boolean(errors.email)}
          required
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email}</p>
        ) : null}
      </div>
      <Button
        type="submit"
        className="h-11 bg-primary text-primary-foreground hover:bg-primary/90 transition-shadow hover:shadow-md"
        disabled={status === "loading"}
      >
        {status === "loading" ? copy.loading : copy.submit}
      </Button>

      {status === "success" ? (
        <Alert className="border-primary/40 bg-primary/10 motion-safe:animate-fadeInUp motion-safe:duration-400">
          <AlertTitle className="text-primary">
            {copy.successTitle}
          </AlertTitle>
          <AlertDescription className="text-primary/90">
            {copy.successBody}
          </AlertDescription>
        </Alert>
      ) : null}

      {status === "error" && !errors.email && !errors.message ? (
        <Alert
          variant="destructive"
          className="border-destructive/60 motion-safe:animate-fadeInUp motion-safe:duration-400"
        >
          <AlertTitle>{errorTitleCopy[language]}</AlertTitle>
          <AlertDescription>{apiErrorCopy[language]}</AlertDescription>
        </Alert>
      ) : null}
    </form>
  );
}
