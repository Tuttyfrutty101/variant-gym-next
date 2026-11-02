"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

export default function TurnstileWidget() {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);

  function renderWidget() {
    if (
      !window.turnstile ||
      !containerRef.current ||
      widgetIdRef.current !== null
    ) {
      return;
    }
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
      theme: "dark",
    });
  }

  useEffect(() => {
    renderWidget();
    return () => {
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={renderWidget}
      />
      <div ref={containerRef} />
    </>
  );
}
