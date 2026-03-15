import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { LanguageTransition } from "@/components/language-transition";
import { CustomCursor } from "@/components/ui/custom-cursor";
import { ScrollProgress, BackToTop } from "@/components/ui/scroll-ui";

import { Toaster } from "@/components/ui/toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://bilel-kaoulala.vercel.app"

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bilel Kaoulala",
  url: siteUrl,
  image: `${siteUrl}/profile.png`,
  jobTitle: "Étudiant en Informatique — Cybersécurité & DevSecOps",
  description: "Portfolio de Bilel Kaoulala — Étudiant en Informatique passionné par la Cybersécurité et le DevSecOps.",
  sameAs: [
    "https://github.com/bilel-k",
    "https://linkedin.com/in/bilel-kaoulala",
  ],
  knowsAbout: ["Cybersécurité", "DevSecOps", "Pentest", "Développement Web", "Réseaux", "Systèmes", "Cloud", "Next.js", "React", "TypeScript"],
}

export const metadata: Metadata = {
  title: "Bilel Kaoulala | Cybersécurité & DevSecOps",
  description: "Portfolio de Bilel Kaoulala — Étudiant en Informatique passionné par la Cybersécurité et le DevSecOps. Découvrez mes projets, certifications et parcours.",
  keywords: ["Bilel Kaoulala", "Portfolio", "Cybersécurité", "DevSecOps", "Pentest", "Développement Web", "Next.js", "React", "TypeScript", "Systèmes d'information", "Informatique", "Web Developer", "Cybersecurity"],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Bilel Kaoulala | Portfolio",
    description: "Étudiant en Informatique passionné par la Cybersécurité & DevSecOps.",
    url: siteUrl,
    siteName: "Portfolio Bilel Kaoulala",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Bilel Kaoulala Portfolio" }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bilel Kaoulala | Portfolio",
    description: "Étudiant en Informatique passionné par la Cybersécurité & DevSecOps.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/b.png",
    shortcut: "/b.png",
    apple: "/b.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#070d1b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground noise-overlay overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
          <Toaster>
          <CustomCursor />
          <ScrollProgress />
          <BackToTop />
          <Navbar />
          <main className="flex-1 w-full pt-[4.25rem] flex flex-col">
            <LanguageTransition>{children}</LanguageTransition>
          </main>
          <Footer />
          </Toaster>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
