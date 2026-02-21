export default function UnauthorizedPage() {
  return (
    <main style={{ margin: "0 auto", maxWidth: "760px", padding: "2.5rem 1.25rem 4rem" }}>
      <h1 style={{ margin: 0, fontSize: "2rem", fontWeight: 600 }}>Unauthorized</h1>
      <p style={{ marginTop: "0.75rem" }}>A valid Authorization header is required.</p>
    </main>
  )
}
