"use client";

import { useId, useRef, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { resizeImageFile } from "@/lib/resizeImageFile";
import styles from "./TestimonialImageUpload.module.css";

const BUCKET = "testimonial-images";
const DEFAULT_MAX_BYTES = 5 * 1024 * 1024;
const ALLOWED = new Set(["image/jpeg", "image/png", "image/webp"]);

const MIME_EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

/** @param {number} bytes */
function formatMaxSize(bytes) {
  const mb = bytes / (1024 * 1024);
  return Number.isInteger(mb) ? `${mb}MB` : `${mb.toFixed(1)}MB`;
}

/**
 * @param {Object} props
 * @param {string} props.value
 * @param {(url: string | null) => void} props.onChange
 * @param {string} props.folderKey — UUID folder under the bucket (row id or draft id)
 * @param {(message: string | null) => void} [props.onError]
 * @param {string} [props.fieldId] — label `for` / input id stem
 * @param {string} [props.bucket] — storage bucket (default testimonial-images)
 * @param {number} [props.maxBytes] — max upload size (default 5MB)
 * @param {number} [props.resizeMaxPx] — resize longest edge before upload (optional)
 */
export default function TestimonialImageUpload({
  value,
  onChange,
  folderKey,
  onError,
  fieldId: fieldIdProp,
  bucket = BUCKET,
  maxBytes = DEFAULT_MAX_BYTES,
  resizeMaxPx,
}) {
  const reactId = useId();
  const fieldId = fieldIdProp ?? `headshot-${reactId.replace(/:/g, "")}`;
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [imgBroken, setImgBroken] = useState(false);

  const hasUrl = typeof value === "string" && value.trim().length > 0;
  const showPreview = hasUrl && !imgBroken;

  async function handleFile(e) {
    const input = e.target;
    const file = input.files?.[0];
    input.value = "";
    if (!file) return;

    onError?.(null);

    if (!ALLOWED.has(file.type)) {
      onError?.("Please choose a JPEG, PNG, or WebP image.");
      return;
    }
    if (file.size > maxBytes) {
      onError?.(`Image must be ${formatMaxSize(maxBytes)} or smaller.`);
      return;
    }

    let uploadFile = file;
    if (typeof resizeMaxPx === "number" && resizeMaxPx > 0) {
      try {
        uploadFile = await resizeImageFile(file, resizeMaxPx);
      } catch {
        onError?.("Could not prepare image for upload.");
        return;
      }
    }

    const ext = MIME_EXT[uploadFile.type] ?? "webp";
    if (!ext) {
      onError?.("Unsupported image type.");
      return;
    }

    const path = `${folderKey}/avatar.${ext}`;

    setUploading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.storage.from(bucket).upload(path, uploadFile, {
        upsert: true,
        contentType: uploadFile.type,
      });
      if (error) {
        onError?.(error.message);
        return;
      }
      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      if (!data?.publicUrl) {
        onError?.("Could not resolve image URL.");
        return;
      }
      setImgBroken(false);
      onError?.(null);
      onChange(data.publicUrl);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.row}>
        {showPreview ? (
          <img
            className={styles.avatar}
            src={value}
            alt=""
            onError={() => setImgBroken(true)}
          />
        ) : (
          <div className={styles.placeholder} aria-hidden>
            Photo
          </div>
        )}
        <div className={styles.actions}>
          <input
            ref={inputRef}
            id={fieldId}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className={styles.visuallyHidden}
            onChange={handleFile}
            disabled={uploading}
          />
          <button
            type="button"
            className={styles.uploadBtn}
            disabled={uploading}
            onClick={() => inputRef.current?.click()}
          >
            {uploading ? "Uploading…" : hasUrl ? "Upload new" : "Upload image"}
          </button>
        </div>
      </div>
      <p className={styles.hint}>
        JPEG, PNG, or WebP · up to {formatMaxSize(maxBytes)}
        {typeof resizeMaxPx === "number" && resizeMaxPx > 0
          ? ` · optimized to ${resizeMaxPx}px for fast loading`
          : ""}
      </p>
    </div>
  );
}
