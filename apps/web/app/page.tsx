import { Button } from "@repo/ui/components/button"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World - User dashboard</h1>
        <Link href="/auth/sign-in">
          <Button size="sm">Login</Button>
        </Link>
      </div>
    </div>
  )
}
