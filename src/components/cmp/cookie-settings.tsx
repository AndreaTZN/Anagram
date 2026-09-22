"use client";

import * as React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { scrollLockRef } from "@/lib/lenis";

import { useCookieConsent } from "./base/consent-provider";
import { useConsentForm } from "./base/use-consent-form";

export const consentButtonClass =
  "min-h-12 rounded-full px-5 py-3 cursor-pointer transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0c0c] active:not-aria-[haspopup]:translate-y-0";

/**
 * The full consent dialog: title, one checkbox per category — each expandable
 * to the services it covers — and the action buttons.
 *
 * All of the behaviour lives in `useConsentForm()` — this file is markup.
 */
export function CookieSettings({
  open,
  onOpenChange,
  dismissible = true,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When false, the user must pick an option (no close button / esc / outside). */
  dismissible?: boolean;
}) {
  React.useEffect(() => {
    if (!open) return;
    // Base UI locks the document, while the site scrolls inside Lenis's wrapper.
    const previousLock = scrollLockRef.current;
    scrollLockRef.current = true;
    return () => {
      scrollLockRef.current = previousLock;
    };
  }, [open]);

  // The dialog's closed state is expressed purely through tw-animate-css
  // utilities, which this project doesn't load — an unmounted-when-closed
  // dialog is what actually hides it here.
  if (!open) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={dismissible ? onOpenChange : undefined}
      // Base UI gates dismissal on the root: no outside-click close, and
      // withholding onOpenChange above already blocks esc.
      disablePointerDismissal={!dismissible}
    >
      {/* Explicit colours: the shadcn theme variables aren't defined in this
          project, so bg-popover et al. would resolve to nothing. */}
      <DialogContent
        id="cookie-settings-dialog"
        data-lenis-prevent
        showCloseButton={dismissible}
        className="flex max-h-[calc(100dvh-2rem)] flex-col gap-0 overflow-hidden rounded-xl border-0 bg-white p-0 text-[#0c0c0c] ring-0 sm:max-w-lg [&_[data-slot=dialog-close]]:transition-none"
      >
        {/* Only mounted while open, so the draft always starts from the saved
            consent — nothing to reset, and nothing pre-ticked. */}
        <SettingsForm onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

/** The draft unmounts on close, so dismissing never saves unfinished changes. */
export function SettingsForm({ onDone }: { onDone?: () => void }) {
  const { messages, privacyPolicyUrl } = useCookieConsent();
  const form = useConsentForm();

  const done = (action: () => void) => () => {
    action();
    onDone?.();
  };

  return (
    <div id="cookie-settings-form" className="flex min-h-0 flex-col">
      <DialogHeader
        id="cookie-settings-header"
        className="shrink-0 px-6 pt-6 pb-4 pr-12"
      >
        <DialogTitle id="cookie-settings-title">{messages.title}</DialogTitle>
      </DialogHeader>

      <div
        id="cookie-settings-body"
        className="min-h-0 overflow-y-auto overscroll-contain px-6 pb-6"
      >
        <DialogDescription
          id="cookie-settings-description"
          className="mb-5 leading-relaxed text-[#0c0c0c]/60"
        >
          {messages.description}
        </DialogDescription>

        <Accordion
          id="cookie-settings-categories"
          multiple
          className="space-y-2"
        >
          <CategoryItem
            id="essential"
            label={messages.categories.essential.name}
            checked
            disabled
            trailing={<Badge variant="secondary">{messages.required}</Badge>}
          />

          {form.categories.map((row) => (
            <CategoryItem
              key={row.category}
              id={row.category}
              label={messages.categories[row.category].name}
              checked={row.checked}
              onCheckedChange={row.toggle}
              expandable={row.services.length > 0}
            >
              {/* Named, not toggleable: consent is category-level, and the list
                is what lets the user see which third parties it covers. */}
              <ul className="space-y-1 border-t border-[#0c0c0c]/20 pt-3">
                {row.services.map((service) => (
                  <li key={service.id} className="px-3 py-2 text-sm">
                    {service.name}
                  </li>
                ))}
              </ul>
            </CategoryItem>
          ))}
        </Accordion>

        <p
          id="cookie-settings-privacy"
          className="mt-5 text-sm leading-relaxed text-[#0c0c0c]/60"
        >
          {messages.privacyPolicyPrefix}{" "}
          <a
            href={privacyPolicyUrl}
            className="underline underline-offset-4 hover:text-[#0c0c0c]"
          >
            {messages.privacyPolicy}
          </a>
          .
        </p>
      </div>

      <DialogFooter
        id="cookie-settings-actions"
        className="mx-0 mb-0 shrink-0 border-[#0c0c0c]/10 bg-transparent p-6"
      >
        <Button
          id="cookie-settings-reject"
          variant="outline"
          className={`${consentButtonClass} border-[#0c0c0c]/20 text-[#0c0c0c] hover:bg-[#0c0c0c]/5 sm:flex-1`}
          onClick={done(form.rejectAll)}
        >
          {messages.rejectAll}
        </Button>
        <Button
          id="cookie-settings-save"
          variant="outline"
          className={`${consentButtonClass} bg-[#0c0c0c] text-white hover:bg-[#0c0c0c]/90 sm:flex-1`}
          onClick={done(form.submit)}
        >
          {messages.save}
        </Button>
      </DialogFooter>
    </div>
  );
}

/** A single category row: checkbox + name, optionally expandable to its services. */
function CategoryItem({
  id,
  label,
  checked,
  disabled,
  onCheckedChange,
  expandable,
  trailing,
  children,
}: {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  expandable?: boolean;
  trailing?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <AccordionItem
      id={`cookie-settings-category-${id}`}
      value={id}
      className="rounded-lg border border-[#0c0c0c]/10 px-4 last:border-b"
    >
      <div
        id={`cookie-settings-category-${id}-controls`}
        className="relative flex items-center gap-3 py-3"
      >
        {/* Explicit colours over the shadcn theme variables: bg-primary and
            text-primary-foreground resolve to nothing here, so the box stayed
            unfilled and the tick kept the inherited dark colour. The indicator
            is targeted directly — it renders `text-current`, so colouring only
            the root leaves the check itself up to inheritance. */}
        <Checkbox
          id={`cookie-settings-category-${id}-checkbox`}
          className="z-10 size-5 cursor-pointer rounded-[0.25rem] border-[#0c0c0c]/20 transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0c0c] data-checked:border-[#0c0c0c] data-checked:bg-[#0c0c0c] data-checked:text-white **:data-[slot=checkbox-indicator]:text-white"
          checked={checked}
          disabled={disabled}
          onCheckedChange={(value) => onCheckedChange?.(value === true)}
        />
        <Label
          htmlFor={`cookie-settings-category-${id}-checkbox`}
          className={`relative z-10 text-base font-semibold ${expandable ? "cursor-pointer" : "flex-1"}`}
        >
          {label}
        </Label>
        {trailing}
        {expandable && (
          // Keep the checkbox and label above the row-wide trigger as separate controls.
          <AccordionTrigger
            id={`cookie-settings-category-${id}-expand`}
            aria-label={label}
            className="absolute inset-y-0 -inset-x-4 w-[calc(100%+2rem)] cursor-pointer items-center justify-end px-4 py-0 transition-none hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0c0c0c]"
          />
        )}
      </div>
      {expandable && (
        <AccordionContent
          id={`cookie-settings-category-${id}-services`}
          className="pb-3"
          style={{ animation: "none" }}
        >
          {children}
        </AccordionContent>
      )}
    </AccordionItem>
  );
}
