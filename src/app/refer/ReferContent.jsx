"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ReferContent.module.css";

const LOGO_CIRC_WHITE = "/logos/VTL_Circ_White-01.png";
/** Intrinsic pixels (~1:1 circle mark); display size controlled in CSS */
const LOGO_WIDTH = 1255;
const LOGO_HEIGHT = 1240;

// Edit the referral message here — it's used everywhere on the page (sms link, share, and the copy fallback).
const MESSAGE =
  "Thought of you! My gym, Variant Training Lab, lets members refer friends for a Biomechanical Consultation. It's a deep look at how you move and what your body needs to train for the long haul. I think it's worth checking out. Fill out the form at varianttraininglab.com/contact, and they said you can put my name under Goals, and they'll reach out.";

// Open question (flagged, not decided): what should happen to this page after the deadline —
// stay up with this line removed, or come down entirely? Edit the date here either way.
const REFERRAL_DEADLINE_TEXT = "Valid through October 31, 2026";

const DEFAULT_SMS_PREFIX = "sms:?&body=";

function buildSmsHref(prefix) {
  return `${prefix}${encodeURIComponent(MESSAGE)}`;
}

export default function ReferContent() {
  const [smsHref, setSmsHref] = useState(() => buildSmsHref(DEFAULT_SMS_PREFIX));
  const [canShare, setCanShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  useEffect(() => {
    const ua = navigator.userAgent || "";
    let prefix = DEFAULT_SMS_PREFIX;
    if (/iPhone|iPad|iPod/i.test(ua)) {
      prefix = "sms:&body=";
    } else if (/Android/i.test(ua)) {
      prefix = "sms:?body=";
    }
    setSmsHref(buildSmsHref(prefix));
    setCanShare(typeof navigator.share === "function");
  }, []);

  useEffect(
    () => () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    },
    []
  );

  async function handleShare() {
    try {
      await navigator.share({ text: MESSAGE });
    } catch {
      // Member cancelled the share sheet or it failed — nothing to recover from here.
    }
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(MESSAGE);
      setCopied(true);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 4000);
    } catch {
      // Clipboard API unavailable — the message text below is still there to select by hand.
    }
  }

  return (
    <main
      className="homeMarketingDark siteBelowNav"
      style={{ background: "var(--carbon)", minHeight: "100vh" }}
    >
      <section className={styles.section}>
        <div className={styles.logoWrap}>
          <Image
            src={LOGO_CIRC_WHITE}
            alt="Variant Training Lab"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className={styles.logo}
            priority
          />
        </div>

        <p className={styles.eyebrow}>Members · Refer a Friend</p>
        <h1 className={styles.heading}>Invite a friend in 30 seconds</h1>
        <p className={styles.subhead}>
          Tap the button, pick a friend, hit send. The message is written for you.
        </p>

        <div className={styles.actions}>
          <a href={smsHref} className={styles.primaryBtn}>
            Text a friend
          </a>
          {canShare && (
            <button type="button" className={styles.secondaryBtn} onClick={handleShare}>
              Share another way
            </button>
          )}
        </div>

        <div className={styles.messageBox}>
          <p className={styles.messageText}>{MESSAGE}</p>
          <button type="button" className={styles.copyBtn} onClick={handleCopy}>
            {copied ? "Copied — paste it into any message." : "Copy message"}
          </button>
        </div>

        <p className={styles.finePrint}>
          Current-member referrals · {REFERRAL_DEADLINE_TEXT}
        </p>
      </section>
    </main>
  );
}
