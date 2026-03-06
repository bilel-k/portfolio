"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { translations, type Lang, type Translations } from "@/lib/translations"

type LanguageContextType = {
  lang: Lang
  t: Translations
  toggle: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr")
  const toggle = useCallback(() => setLang(prev => prev === "fr" ? "en" : "fr"), [])

  return (
    <LanguageContext.Provider value={{ lang, t: translations[lang] as unknown as Translations, toggle }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider")
  return ctx
}
