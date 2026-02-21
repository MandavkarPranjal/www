"use server"

import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth"
import { createEntry, getEntryById, updateEntry } from "@/lib/entries"

function normalizeTag(tag: string) {
  return tag.trim().toLowerCase().replace(/\s+/g, "-")
}

function parseTags(rawTags: FormDataEntryValue | null) {
  return typeof rawTags === "string"
    ? Array.from(new Set(rawTags.split(",").map(normalizeTag).filter(Boolean)))
    : []
}

async function requireAdminSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase()

  if (!session?.user) {
    redirect("/admin/login")
  }

  if (adminEmail && session.user.email.toLowerCase() !== adminEmail) {
    redirect("/unauthorized")
  }
}

function revalidateEntryPaths(tags: string[]) {
  revalidatePath("/entries")
  for (const tag of tags) {
    revalidatePath(`/entries/tags/${tag}`)
  }
}

export async function createEntryAction(formData: FormData) {
  await requireAdminSession()

  const rawBody = formData.get("body")
  const rawTags = formData.get("tags")

  const body = typeof rawBody === "string" ? rawBody.trim() : ""
  const tags = parseTags(rawTags)

  if (!body) {
    return
  }

  await createEntry(body, tags)

  revalidateEntryPaths(tags)
  redirect("/admin/entries")
}

export async function updateEntryAction(formData: FormData) {
  await requireAdminSession()

  const rawId = formData.get("id")
  const rawBody = formData.get("body")
  const rawTags = formData.get("tags")

  const id = typeof rawId === "string" ? rawId : ""
  const body = typeof rawBody === "string" ? rawBody.trim() : ""
  const tags = parseTags(rawTags)

  if (!id || !body) {
    return
  }

  const existing = await getEntryById(id)
  if (!existing) {
    redirect("/admin/entries")
  }

  await updateEntry(id, body, tags)

  const allTags = Array.from(new Set([...(existing.tags ?? []), ...tags]))
  revalidateEntryPaths(allTags)
  redirect("/admin/entries")
}
