"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./AdminSnackbar.module.css";

const AdminSnackbarContext = createContext(null);

const AUTO_DISMISS_MS = 4500;

export function AdminSnackbarProvider({ children }) {
  const [state, setState] = useState(null);
  const timerRef = useRef(null);

  const dismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setState(null);
  }, []);

  const showSnackbar = useCallback((message, options = {}) => {
    if (message == null || String(message).trim() === "") return;
    const variant = options.variant === "error" ? "error" : "success";
    setState({
      message: String(message),
      variant,
      key: Date.now(),
    });
  }, []);

  useEffect(() => {
    if (!state) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setState(null);
    }, AUTO_DISMISS_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [state]);

  const value = { showSnackbar, dismiss };

  return (
    <AdminSnackbarContext.Provider value={value}>
      {children}
      {state ? (
        <div
          key={state.key}
          className={`${styles.snackbar} ${state.variant === "error" ? styles.snackbarError : styles.snackbarSuccess}`}
          role={state.variant === "error" ? "alert" : "status"}
          aria-live={state.variant === "error" ? "assertive" : "polite"}
        >
          <span className={styles.snackbarText}>{state.message}</span>
          <button
            type="button"
            className={styles.snackbarDismiss}
            onClick={dismiss}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ) : null}
    </AdminSnackbarContext.Provider>
  );
}

export function useAdminSnackbar() {
  const ctx = useContext(AdminSnackbarContext);
  if (!ctx) {
    throw new Error("useAdminSnackbar must be used within AdminSnackbarProvider");
  }
  return ctx;
}
