import * as React from "react";
import { cn } from "@/lib/utils";
import {
  getSiteContactReadiness,
  getWhatsAppHrefOrFallback,
  siteContact,
} from "@/lib/site-contact";

type WhatsAppLinkProps = Omit<
  React.ComponentPropsWithoutRef<"a">,
  "href" | "children"
> & {
  message?: string;
  children: React.ReactNode;
  /** Abre em nova aba só quando o destino é wa.me */
  externalWhenWhatsApp?: boolean;
};

export const WhatsAppLink = React.forwardRef<
  HTMLAnchorElement,
  WhatsAppLinkProps
>(function WhatsAppLink(
  {
    message,
    children,
    externalWhenWhatsApp = true,
    className,
    "aria-label": ariaLabel,
    ...props
  },
  ref
) {
  const readiness = getSiteContactReadiness();
  const whatsappHref = message
    ? getWhatsAppHrefOrFallback({ message })
    : getWhatsAppHrefOrFallback();
  const isWhatsApp =
    readiness.whatsapp && whatsappHref.startsWith("https://wa.me/");

  return (
    <a
      ref={ref}
      href={whatsappHref}
      className={cn(className)}
      aria-label={
        ariaLabel ??
        (isWhatsApp
          ? `Conversar no WhatsApp com a ${siteContact.name}`
          : `Falar com a ${siteContact.name}`)
      }
      {...(isWhatsApp && externalWhenWhatsApp
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      {...props}
    >
      {children}
    </a>
  );
});

WhatsAppLink.displayName = "WhatsAppLink";
