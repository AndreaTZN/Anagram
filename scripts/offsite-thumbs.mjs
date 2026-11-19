// Regenerates the Summer Offsite display thumbnails from the full photos.
// Run after adding or replacing a photo: node scripts/offsite-thumbs.mjs
// sharp ships with Next.js, so no extra dependency is needed.
import { mkdir } from "node:fs/promises";
import sharp from "sharp";
import pools from "../src/components/summer-offsite/photo-pools.json" with { type: "json" };

const SOURCE = "public/news/SummerOffsite/photos";
const TARGET = "public/news/SummerOffsite/thumbs";

// Longest side in pixels, sized to the largest non-enlarged draw at 3x DPR:
// sphere ~150px, pile ~220px, counter textures ~390px.
const SIZES = { sphere: 256, pile: 256, counter: 512 };

await mkdir(TARGET, { recursive: true });
for (const [pool, names] of Object.entries(pools)) {
  const size = SIZES[pool];
  for (const name of names) {
    await sharp(`${SOURCE}/${name}`)
      .resize({
        width: size,
        height: size,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82 })
      .toFile(`${TARGET}/${name}`);
  }
  console.log(`${pool}: ${names.length} thumbnails at ${size}px`);
}
