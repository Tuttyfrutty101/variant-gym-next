import { Suspense } from "react";
import LoginForm from "./LoginForm";
import styles from "../admin.module.css";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.loginCard}>
          <p className={styles.lead}>Loading…</p>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
