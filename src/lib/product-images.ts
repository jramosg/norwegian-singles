/**
 * Product photos for affiliate items, keyed by the `cover` path in
 * affiliate.ts. Use the manufacturer's official product image for new
 * items: Amazon's rules forbid self-hosting Amazon product photos.
 */
const files = import.meta.glob<{ default: ImageMetadata }>('../assets/*.jpg', {
  eager: true,
});

/** Throws on a missing file so a typo in `cover` fails the build. */
export function productImage(cover?: string): ImageMetadata | undefined {
  if (!cover) return undefined;
  const file = files[`../assets${cover}`];
  if (!file) throw new Error(`No product image at src/assets${cover}`);
  return file.default;
}
