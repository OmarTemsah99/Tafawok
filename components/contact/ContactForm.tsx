"use client"

import React, { useState } from "react"
import { useLocaleStore } from "@/stores/useLocaleStore"
import { PROPERTIES, OWNER_DETAILS } from "@/content/cre-data"
import { CheckCircle2, AlertCircle, Loader2, Send, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContactFormProps {
  initialProperty?: string
  className?: string
}

export function ContactForm({
  initialProperty = "",
  className = "",
}: ContactFormProps) {
  const { t, locale } = useLocaleStore()
  const isRtl = locale === "ar"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [property, setProperty] = useState(initialProperty || "all")
  const [inquiryType, setInquiryType] = useState<string>("leasing")
  const [message, setMessage] = useState("")

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const cleanOwnerPhone = OWNER_DETAILS.phone.replace(/[^+\d]/g, "")

  const inquiryTypes = [
    { id: "leasing", label: t("contactForm.inquiryTypes.leasing") },
    { id: "investment", label: t("contactForm.inquiryTypes.investment") },
    { id: "turnkey", label: t("contactForm.inquiryTypes.turnkey") },
    { id: "general", label: t("contactForm.inquiryTypes.general") },
  ]

  const validate = (): boolean => {
    const errs: Record<string, string> = {}

    if (!name.trim() || name.trim().length < 3) {
      errs.name = t("contactPage.validationName")
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = t("contactPage.validationEmail")
    }

    if (!phone.trim() || phone.trim().length < 6) {
      errs.phone = t("contactPage.validationPhone")
    }

    if (!message.trim() || message.trim().length < 10) {
      errs.message = t("contactPage.validationMessage")
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!validate()) return

    setLoading(true)

    // Resolve property label for email
    let propertyLabel = t("contactForm.anyProperty")
    if (property !== "all") {
      const matched = PROPERTIES.find((p) => p.slug === property)
      if (matched) {
        propertyLabel = `${matched.name[locale]} (${matched.name.en})`
      }
    }

    const matchedType = inquiryTypes.find((it) => it.id === inquiryType)
    const typeLabel = matchedType ? matchedType.label : inquiryType

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          property: propertyLabel,
          inquiryType: typeLabel,
          message,
        }),
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMessage(data.message || t("contactForm.errorMessage"))
        if (data.errors) {
          setErrors(data.errors)
        }
      } else {
        setSuccess(true)
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
        setProperty("all")
        setErrors({})
      }
    } catch {
      setErrorMessage(t("contactForm.errorMessage"))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/80 bg-card/60 p-6 shadow-xs sm:p-8 md:p-10",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-border/70 pb-6">
        <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl lg:text-3xl">
          {t("contactForm.title")}
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {t("contactForm.subtitle")}
        </p>
      </div>

      {success ? (
        <div className="py-10 text-center sm:py-14">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="size-7" />
          </div>
          <h3 className="mt-4 text-lg font-bold text-foreground sm:text-xl">
            {t("contactForm.successMessage")}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {t("contactPage.slaNote")}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="cursor-target inline-flex items-center justify-center rounded-xl border border-border/80 bg-secondary/50 px-6 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-secondary active:scale-[0.98]"
            >
              <span>
                {isRtl ? "إرسال استفسار آخر" : "Submit Another Inquiry"}
              </span>
            </button>

            <a
              href={`tel:${cleanOwnerPhone}`}
              className="cursor-target inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-primary-foreground shadow-xs transition-all hover:bg-primary/90 active:scale-[0.98]"
            >
              <Phone className="size-3.5 rtl:-scale-x-100" />
              <span>{t("contactPage.callDirect")}</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Classification Selector */}
          <div>
            <label className="block text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              {t("contactForm.inquiryTypeLabel")}
            </label>
            <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {inquiryTypes.map((type) => (
                <button
                  type="button"
                  key={type.id}
                  onClick={() => setInquiryType(type.id)}
                  className={cn(
                    "cursor-target flex items-center justify-between rounded-xl border px-4 py-3 text-start text-xs font-medium transition-all",
                    inquiryType === type.id
                      ? "border-primary/80 bg-primary/10 font-bold text-foreground shadow-xs"
                      : "border-border/70 bg-background/60 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  <span>{type.label}</span>
                  <span
                    className={cn(
                      "size-2 rounded-full",
                      inquiryType === type.id ? "bg-primary" : "bg-border"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Name & Corporate Email Grid */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-semibold text-foreground"
              >
                {t("contactForm.nameLabel")}{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  if (errors.name) setErrors((prev) => ({ ...prev, name: "" }))
                }}
                placeholder={t("contactForm.namePlaceholder")}
                className={cn(
                  "mt-2 w-full rounded-xl border bg-background px-4 py-2.5 text-xs text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm",
                  errors.name ? "border-destructive" : "border-border/80"
                )}
              />
              {errors.name && (
                <p className="mt-1.5 text-[11px] font-medium text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Corporate Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-foreground"
              >
                {t("contactForm.emailLabel")}{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                id="email"
                type="email"
                dir="ltr"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email)
                    setErrors((prev) => ({ ...prev, email: "" }))
                }}
                placeholder={t("contactForm.emailPlaceholder")}
                className={cn(
                  "mt-2 w-full rounded-xl border bg-background px-4 py-2.5 text-xs text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm",
                  errors.email ? "border-destructive" : "border-border/80"
                )}
              />
              {errors.email && (
                <p className="mt-1.5 text-[11px] font-medium text-destructive">
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          {/* Phone & Property Selection */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Phone */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-semibold text-foreground"
              >
                {t("contactForm.phoneLabel")}{" "}
                <span className="text-primary">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                dir="ltr"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (errors.phone)
                    setErrors((prev) => ({ ...prev, phone: "" }))
                }}
                placeholder={t("contactForm.phonePlaceholder")}
                className={cn(
                  "mt-2 w-full rounded-xl border bg-background px-4 py-2.5 text-xs text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm",
                  errors.phone ? "border-destructive" : "border-border/80"
                )}
              />
              {errors.phone && (
                <p className="mt-1.5 text-[11px] font-medium text-destructive">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Target Property */}
            <div>
              <label
                htmlFor="property"
                className="block text-xs font-semibold text-foreground"
              >
                {t("contactForm.propertyLabel")}
              </label>
              <select
                id="property"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
                className="mt-2 w-full rounded-xl border border-border/80 bg-background px-4 py-2.5 text-xs text-foreground transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm"
              >
                <option value="all">{t("contactForm.anyProperty")}</option>
                {PROPERTIES.map((prop) => (
                  <option key={prop.slug} value={prop.slug}>
                    {prop.name[locale]} ({prop.name.en})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Requirements & Specifications */}
          <div>
            <label
              htmlFor="message"
              className="block text-xs font-semibold text-foreground"
            >
              {t("contactForm.messageLabel")}{" "}
              <span className="text-primary">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value)
                if (errors.message)
                  setErrors((prev) => ({ ...prev, message: "" }))
              }}
              placeholder={t("contactForm.messagePlaceholder")}
              className={cn(
                "mt-2 w-full rounded-xl border bg-background px-4 py-3 text-xs leading-relaxed text-foreground transition-colors placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none sm:text-sm",
                errors.message ? "border-destructive" : "border-border/80"
              )}
            />
            {errors.message && (
              <p className="mt-1.5 text-[11px] font-medium text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <div className="flex-1">
                <p className="font-semibold">{errorMessage}</p>
                <p className="mt-1 text-muted-foreground">
                  {isRtl
                    ? "يمكنك الاتصال هاتفياً مباشرة بالمكتب التنفيذي:"
                    : "You may reach our executive desk directly via telephone:"}{" "}
                  <a
                    href={`tel:${cleanOwnerPhone}`}
                    className="font-bold text-foreground underline hover:text-primary"
                  >
                    {OWNER_DETAILS.phone}
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "cursor-target inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:text-sm",
                isRtl ? "flex-row-reverse" : ""
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>{t("contactForm.submittingBtn")}</span>
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  <span>{t("contactForm.submitBtn")}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
