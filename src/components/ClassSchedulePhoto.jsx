"use client";

import Image from "next/image";
import { useState } from "react";
import { classScheduleThumbUrl } from "@/lib/classScheduleImage";
import styles from "./ClassSchedule.module.css";

/**
 * @param {{ url: string; priority?: boolean }} props
 */
export default function ClassSchedulePhoto({ url, priority = false }) {
  const fullUrl = url.trim();
  const thumbUrl = classScheduleThumbUrl(fullUrl);
  const [src, setSrc] = useState(thumbUrl);

  return (
    <Image
      className={styles.classPhoto}
      src={src}
      alt=""
      width={44}
      height={44}
      sizes="44px"
      priority={priority}
      decoding="async"
      onError={() => {
        if (src !== fullUrl) setSrc(fullUrl);
      }}
    />
  );
}
