/**
 * Resize an image file in the browser for thumbnail use (keeps aspect ratio).
 * @param {File} file
 * @param {number} maxPx — longest edge in pixels
 * @returns {Promise<File>}
 */
export async function resizeImageFile(file, maxPx) {
  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  const longest = Math.max(width, height);
  const scale = Math.min(1, maxPx / longest);

  if (scale >= 1 && file.type === "image/webp" && file.size <= 120_000) {
    bitmap.close();
    return file;
  }

  const w = Math.max(1, Math.round(width * scale));
  const h = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not prepare image.");
  }
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();

  const blob = await new Promise((resolve) => {
    canvas.toBlob(resolve, "image/webp", 0.82);
  });
  if (!blob) {
    throw new Error("Could not compress image.");
  }

  const baseName = file.name.replace(/\.[^.]+$/, "") || "photo";
  return new File([blob], `${baseName}.webp`, { type: "image/webp" });
}
