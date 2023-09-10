import { SignIn } from "@clerk/nextjs"

export default function SignInPage() {
  return (
    <div className="w-screen h-screen flex place-content-center">
      <SignIn signUpUrl="/sign-up" afterSignInUrl="/journal" />
    </div>
  )
}
