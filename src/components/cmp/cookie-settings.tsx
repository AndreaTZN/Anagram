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

import { useCookieConsent } from "./base/consent-provider";
import { useConsentForm } from "./base/use-consent-form";

/** Shared by both consent views, so the pill shape survives the swap between
 *  the banner's intro and its settings. */
export const consentButtonClass = "rounded-full py-6";

/**
 * The full consent dialog: title, one checkbox per category — each expandable
 * to the services it covers — and the action buttons. Used both as the default
 * banner and as the reopenable settings dialog.
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
        showCloseButton={dismissible}
        className="sm:max-w-lg bg-white text-[#0c0c0c] rounded-xl p-6 gap-4"
      >
        {/* Only mounted while open, so the draft always starts from the saved
            consent — nothing to reset, and nothing pre-ticked. */}
        <SettingsForm onDone={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

/**
 * The category list and its actions.
 *
 * `inline` drops the dialog chrome — header and DialogFooter — so the same form
 * can render inside the side banner's card, where the title and description are
 * already on the view it replaces.
 */
export function SettingsForm({
  onDone,
  inline = false,
}: {
  /** Dialog-only: inline, saving closes the banner by itself. */
  onDone?: () => void;
  inline?: boolean;
}) {
  const { messages, privacyPolicyUrl } = useCookieConsent();
  const form = useConsentForm();

  // Saving a choice already closes the banner on its own. Inline, calling
  // onDone() on top of that swapped the card back to the intro view mid-exit,
  // so the user saw it rewind a step while fading out. The dialog still needs
  // the explicit close.
  const done = (action: () => void) => () => {
    action();
    if (!inline) onDone?.();
  };

  const Footer = inline ? InlineFooter : DialogFooter;

  return (
    <>
      {!inline && (
        <DialogHeader>
          <DialogTitle>{messages.title}</DialogTitle>
          <DialogDescription>{messages.description}</DialogDescription>
        </DialogHeader>
      )}

      <Accordion multiple className="space-y-2">
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

      <Footer>
        <Button
          variant="outline"
          className={`${consentButtonClass} border-[#0c0c0c]/20 text-[#0c0c0c] hover:bg-[#0c0c0c]/5${inline ? " sm:flex-1" : ""}`}
          onClick={done(form.rejectAll)}
        >
          {messages.rejectAll}
        </Button>
        <Button
          variant="outline"
          className={`${consentButtonClass} bg-[#0c0c0c] text-white hover:bg-[#0c0c0c]/90${inline ? " sm:flex-1" : ""}`}
          onClick={done(form.submit)}
        >
          {messages.save}
        </Button>
      </Footer>
    </>
  );
}

/** Matches the side banner's button row: DialogFooter's negative margins and
 *  bordered bar belong to the dialog, not to a card. */
function InlineFooter({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 sm:flex-row mt-4">{children}</div>;
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
      value={id}
      className="rounded-lg border border-[#0c0c0c]/10 px-4 last:border-b"
    >
      <div className="flex items-center gap-3 py-3">
        {/* Explicit colours over the shadcn theme variables: bg-primary and
            text-primary-foreground resolve to nothing here, so the box stayed
            unfilled and the tick kept the inherited dark colour. The indicator
            is targeted directly — it renders `text-current`, so colouring only
            the root leaves the check itself up to inheritance. */}
        <Checkbox
          id={`cmp-cat-${id}`}
          className="size-5 border-[#0c0c0c]/20 data-checked:border-[#0c0c0c] data-checked:bg-[#0c0c0c] data-checked:text-white **:data-[slot=checkbox-indicator]:text-white"
          checked={checked}
          disabled={disabled}
          onCheckedChange={(value) => onCheckedChange?.(value === true)}
        />
        <Label
          htmlFor={`cmp-cat-${id}`}
          className="flex-1 text-base font-semibold"
        >
          {label}
        </Label>
        {trailing}
        {expandable && (
          <AccordionTrigger className="w-auto flex-none py-0 hover:no-underline" />
        )}
      </div>
      {expandable && (
        <AccordionContent className="pb-3">{children}</AccordionContent>
      )}
    </AccordionItem>
  );
}
