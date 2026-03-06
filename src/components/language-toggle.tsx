"use client"

import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"

export function LanguageToggle() {
  const { lang, toggle } = useLanguage()

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label="Toggle language"
      className="rounded-full font-bold text-[13px] tracking-widest"
    >
      {lang === "fr" ? "EN" : "FR"}
    </Button>
  )
}
