"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      className="rounded-full"
    >
      {mounted
        ? resolvedTheme === "dark"
          ? <Sun className="h-[1.2rem] w-[1.2rem]" />
          : <Moon className="h-[1.2rem] w-[1.2rem]" />
        : <Moon className="h-[1.2rem] w-[1.2rem] opacity-0" />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

