import pools from "./photo-pools.json";

// Disjoint photo pools from the handoff (map-data.js): no photo appears in two
// experiences. Asset names are historical; photo-pools.json defines each pool.
const FULL = "/news/SummerOffsite/photos/";
// Display-size copies from scripts/offsite-thumbs.mjs; the full photo is only
// downloaded once a photo is enlarged.
const THUMB = "/news/SummerOffsite/thumbs/";

export type OffsitePhoto = { thumb: string; full: string };

const toPhoto = (name: string): OffsitePhoto => ({
  thumb: THUMB + name,
  full: FULL + name,
});

export const OFFSITE_PHOTOS = {
  sphere: pools.sphere.map(toPhoto),
  pile: pools.pile.map(toPhoto),
  counter: pools.counter.map(toPhoto),
};
