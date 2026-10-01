'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { headerActions, primaryNav } from '@/content/navigation';
import type { NavItem } from '@/content/types';

function isCurrent(pathname: string, href: string) {
  return pathname === href;
}

function isInSection(pathname: string, item: NavItem) {
  if (pathname === item.href || pathname.startsWith(`${item.href}/`)) return true;
  return item.children?.some((child) => pathname === child.href) ?? false;
}

/**
 * Site header and primary navigation.
 *
 * Accessibility pattern: "disclosure navigation" (not an ARIA menu).
 * - Platform and Solutions open a list of links via a button with aria-expanded.
 * - Escape closes an open submenu (and the mobile menu) and returns focus.
 * - Clicking outside or navigating closes everything.
 * - Below the mobile breakpoint, a single Menu button reveals the whole nav.
 * - Without JavaScript the navigation is fully visible (see html[data-js] in CSS).
 */
export function SiteHeader() {
  const pathname = usePathname() ?? '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [hydrated, setHydrated] = useState(false);

  // Marks the header interactive (used by automated QA to avoid clicking before hydration).
  useEffect(() => setHydrated(true), []);

  // Close everything on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setOpenSubmenu(null);
  }, [pathname]);

  const closeAll = useCallback(() => {
    setOpenSubmenu(null);
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      if (openSubmenu) {
        const button = document.getElementById(`nav-button-${openSubmenu}`);
        setOpenSubmenu(null);
        button?.focus();
      } else if (mobileOpen) {
        setMobileOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) closeAll();
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [openSubmenu, mobileOpen, closeAll]);

  // Close an open submenu when focus leaves it entirely (keyboard users tabbing on).
  function onSubmenuBlur(event: React.FocusEvent<HTMLLIElement>, id: string) {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null) && openSubmenu === id) {
      setOpenSubmenu(null);
    }
  }

  return (
    <header className="site-header" ref={headerRef} data-hydrated={hydrated || undefined}>
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand" aria-current={pathname === '/' ? 'page' : undefined}>
          {/* Logo placeholder: the final Funda360 logo is supplied in Phase 2. */}
          <span className="logo-placeholder">FUNDA360</span>
          <span className="visually-hidden"> home</span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="site-header__menu-button"
          aria-expanded={mobileOpen}
          aria-controls="site-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? 'Close menu' : 'Menu'}
        </button>

        <nav
          id="site-nav"
          aria-label="Primary"
          className="site-nav"
          data-open={mobileOpen}
          // Close menus as soon as any link is activated, without waiting for the route change.
          onClick={(event) => {
            if ((event.target as HTMLElement).closest('a')) closeAll();
          }}
        >
          <ul className="site-nav__list">
            {primaryNav.map((item) => {
              const id = item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const sectionActive = isInSection(pathname, item);

              if (!item.children) {
                return (
                  <li key={item.href} className="site-nav__item">
                    <Link
                      href={item.href}
                      className="site-nav__link"
                      aria-current={isCurrent(pathname, item.href) ? 'page' : undefined}
                      data-active={sectionActive || undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              }

              const expanded = openSubmenu === id;
              return (
                <li key={item.href} className="site-nav__item site-nav__item--has-children" onBlur={(e) => onSubmenuBlur(e, id)}>
                  <button
                    id={`nav-button-${id}`}
                    type="button"
                    className="site-nav__link site-nav__toggle"
                    aria-expanded={expanded}
                    aria-controls={`nav-submenu-${id}`}
                    data-active={sectionActive || undefined}
                    onClick={() => setOpenSubmenu(expanded ? null : id)}
                  >
                    {item.label}
                  </button>
                  <ul id={`nav-submenu-${id}`} className="site-nav__submenu" data-open={expanded}>
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link href={child.href} aria-current={isCurrent(pathname, child.href) ? 'page' : undefined}>
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          <ul className="site-nav__actions">
            <li>
              <Link
                href={headerActions.primary.href}
                className="cta cta--primary"
                aria-current={isCurrent(pathname, headerActions.primary.href) ? 'page' : undefined}
              >
                {headerActions.primary.label}
              </Link>
            </li>
            <li>
              <a href={headerActions.login.href} className="cta cta--secondary">
                {headerActions.login.label}
                <span className="visually-hidden"> (opens the Funda360 application)</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
