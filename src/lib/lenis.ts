import type Lenis from "lenis";

export const globalLenisRef: { current: Lenis | null } = { current: null };

// Verrou de scroll pour les overlays (widgets, modales). On passe par l'option
// `prevent` de Lenis plutôt que par stop() : stop() déclenche reset() + emit()
// et renvoie la page tout en haut.
export const scrollLockRef = { current: false };
