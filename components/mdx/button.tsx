"use client"

import React from "react"

export default function Button({ children }: { children?: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={() => alert(typeof children === "string" ? children : "Clicked!")}
      className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm hover:bg-muted transition-colors"
    >
      {children ?? "Click"}
    </button>
  )
}
