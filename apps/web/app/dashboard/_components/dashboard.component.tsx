'use client'

import { authClient } from "@repo/auth/client"
import { Button } from "@repo/ui/components/button"
import { useRouter } from "next/navigation"

type Props = {
  user: {
    email?: string
    name?: string
  }
}

const DashboardComponent = ({ user }: Props) => {
  const router = useRouter()

  const handleSignOut = async () => {
    await authClient.signOut()
    router.refresh()
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="space-y-6 text-center">
        <h1 className="font-bold text-3xl">Dashboard</h1>

        <p className="text-muted-foreground">
          Welcome, {user.name || user.email}!
        </p>

        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
      </div>
    </div>
  )
}

export default DashboardComponent