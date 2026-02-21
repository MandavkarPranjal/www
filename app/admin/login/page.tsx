import { signInAction } from "./actions"
import styles from "./page.module.css"

export const dynamic = "force-dynamic"

export default function AdminLoginPage() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Admin login</h1>
      <p className={styles.copy}>Use your Better Auth email and password to access writer tools.</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Sign in</h2>
        <form className={styles.form} action={signInAction}>
          <input className={styles.input} type="email" name="email" placeholder="you@example.com" required />
          <input className={styles.input} type="password" name="password" placeholder="Password" required />
          <button className={styles.button} type="submit">
            Sign in
          </button>
        </form>
      </section>
    </main>
  )
}
