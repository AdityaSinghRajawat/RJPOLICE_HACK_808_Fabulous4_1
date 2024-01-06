"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

export default function LoginForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    signIn("credentials", {
      callbackUrl: "/",
      redirect: true,
      email: formValues.email,
      password: formValues.password,
    })
  }

  const signInWithGithub = async () => {
    await signIn("github", { callbackUrl: "/" })
  }
  const signInWithGoogle = async () => {
    await signIn("google", { callbackUrl: "/" })
  }

  return (
    <form onSubmit={onSubmit} className="px-8 py-4 space-y-2">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          onChange={handleChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          onChange={handleChange}
        />
      </div>
      <Button className="w-full">Login</Button>
      <Button type="button" className="w-full" onClick={signInWithGoogle}>
        Google
      </Button>
      <Button type="button" className="w-full" onClick={signInWithGithub}>
        Github
      </Button>
      <p>
        Don't have an account?{" "}
        <Link className="underline" href="/createuser">
          Signup?
        </Link>
      </p>
    </form>
  )
}
