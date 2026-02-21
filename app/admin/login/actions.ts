"use server"

import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"

function isAllowedEmail(email: string) {
  const adminEmail = process.env.ADMIN_EMAIL
  if (!adminEmail) {
    return true
  }

  return email.toLowerCase() === adminEmail.toLowerCase()
}

export async function signInAction(formData: FormData) {
  const emailValue = formData.get("email")
  const passwordValue = formData.get("password")

  const email = typeof emailValue === "string" ? emailValue.trim() : ""
  const password = typeof passwordValue === "string" ? passwordValue : ""

  if (!email || !password || !isAllowedEmail(email)) {
    redirect("/unauthorized")
  }

  await auth.api.signInEmail({
    body: {
      email,
      password,
      callbackURL: "/admin/entries",
    },
    headers: await headers(),
  })

  redirect("/admin/entries")
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  })

  redirect("/admin/login")
}
