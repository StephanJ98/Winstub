"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ReactNode } from "react"
import { authClient } from "@repo/auth/client"


export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <AuthUIProvider
        authClient={authClient}
        navigate={router.push}
        replace={router.replace}
        onSessionChange={() => {
          // Clear router cache (protected routes)
          router.refresh()
        }}
        Link={Link}
      >
        {children}
      </AuthUIProvider>
    </NextThemesProvider>
  )
}
