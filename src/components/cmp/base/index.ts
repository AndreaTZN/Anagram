/**
 * The headless half of the CMP: consent state, persistence, the per-service
 * gate, Google Consent Mode and the settings-form state machine.
 *
 * Nothing in this folder imports from the host app, renders styled markup or
 * knows that shadcn/ui exists — it only depends on React. The components one
 * level up supply the looks. Keep it that way: `__tests__/base-boundary.test.ts`
 * fails the build if anything in here reaches outside.
 *
 * The English texts are the `defaultMessages` in `./messages` — edit them there
 * rather than threading a `messages` prop through your app. Other languages live
 * in `../locales/`, one file each.
 */
export * from "./types";
export * from "./consent-signals";
export * from "./messages";
export * from "./use-stored-consent";
export * from "./consent-mode";
export * from "./consent-provider";
export * from "./cookie-service";
export * from "./use-consent-form";
