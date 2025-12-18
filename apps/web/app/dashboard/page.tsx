import { auth } from "@repo/auth/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

const Page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) redirect('/auth/sign-in')

  return (
    <div className="">
      Admin Dashboard Page
    </div>
  )
}

export default Page