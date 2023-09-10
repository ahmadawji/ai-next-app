import { SignUp, SignUpButton } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="w-screen h-screen flex place-content-center">
      <SignUp
        path="/sign-up"
        routing="path"
        signInUrl="/sign-in"
        redirectUrl="/new-user"
      />
    </div>
  )
}
