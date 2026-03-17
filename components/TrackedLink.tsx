"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, MouseEventHandler, ReactElement } from "react";
import { trackClick, type TrackClickOptions } from "@/lib/analytics";

type AnchorProps = Omit<ComponentPropsWithoutRef<"a">, "href" | "onClick">;

type Props = AnchorProps & {
  external?: boolean;
  href: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  tracking: TrackClickOptions;
};

function isExternalHref(href: string): boolean {
  return /^(?:[a-z]+:)?\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function shouldRenderAnchor(href: string, external?: boolean, download?: boolean): boolean {
  return Boolean(external || download || href.startsWith("#") || isExternalHref(href));
}

export function TrackedLink({
  external,
  href,
  onClick,
  tracking,
  ...anchorProps
}: Props): ReactElement {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    trackClick({
      ...tracking,
      href: tracking.href || href
    });
  };

  if (shouldRenderAnchor(href, external, anchorProps.download)) {
    return <a {...anchorProps} href={href} onClick={handleClick} />;
  }

  return <Link {...anchorProps} href={href} onClick={handleClick} />;
}
