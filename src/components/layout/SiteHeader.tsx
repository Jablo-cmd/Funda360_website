'use client';

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { headerActions, primaryNav } from '@/content/navigation';
import type { NavItem } from '@/content/types';
import { Logo } from '@/components/ui/Logo';

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
 * - Platform and Solutions open a panel of links via a button with aria-expanded.
 * - Escape closes an open panel (and the mobile menu) and returns focus.
 * - Clicking outside or navigating closes everything.
 * - Below 64rem, a single Menu button reveals a full-height navigation sheet.
 * - Without JavaScript the navigation is fully visible (see html[data-js] in CSS).
 */
export function SiteHeader() {
  // Static export serves /platform/ (trailing slash) while nav hrefs are /platform: compare without it.
  const pathname = (usePathname() ?? '/').replace(/(.)\/$/, '$1');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  // Marks the header interactive (used by automated QA to avoid clicking before hydration).
  useEffect(() => {
    headerRef.current?.setAttribute('data-hydrated', '');
  }, []);

  // Close everything on navigation (reset during render when the route changes).
  const [lastPathname, setLastPathname] = useState(pathname);
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
    setOpenSubmenu(null);
  }

  const closeAll = useCallback(() => {
    setOpenSubmenu(null);
    setMobileOpen(false);
  }, []);

  // The mobile sheet covers the page: stop the page behind it from scrolling,
  // and close the sheet if the viewport grows into the desktop layout.
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? 'hidden' : '';
    if (!mobileOpen) return;
    const desktop = window.matchMedia('(min-width: 64rem)');
    const onChange = () => desktop.matches && setMobileOpen(false);
    desktop.addEventListener('change', onChange);
    return () => {
      desktop.removeEventListener('change', onChange);
      document.documentElement.style.overflow = '';
    };
  }, [mobileOpen]);

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
    <header className="site-header" ref={headerRef}>
      <div className="container site-header__inner">
        <Link href="/" className="site-header__brand" aria-current={pathname === '/' ? 'page' : undefined}>
          <Logo />
          <span className="visually-hidden">Funda360 home</span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          className="site-header__menu-button"
          aria-expanded={mobileOpen}
          aria-controls="site-nav"
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          {mobileOpen ? 'Close menu' : 'Menu'}
        </button>

        {/* Every link closes the menus as soon as it is activated, without waiting for the route change. */}
        <nav id="site-nav" aria-label="Primary" className="site-nav" data-open={mobileOpen}>
          <ul className="site-nav__list">
            {primaryNav.map((item) => {
              const id = item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
              const sectionActive = isInSection(pathname, item);

              if (!item.children) {
                return (
                  <li key={item.href} className="site-nav__item">
                    <Link
                      onClick={closeAll}
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
              // The first child is the section overview; it is shown as the panel footer link.
              const [overview, ...pages] = item.children;
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
                    <ChevronDown className="site-nav__chevron" size={16} aria-hidden="true" />
                  </button>
                  <div id={`nav-submenu-${id}`} className="site-nav__submenu" data-open={expanded} data-size={pages.length > 4 ? 'wide' : 'compact'}>
                    <ul className="site-nav__panel-grid">
                      {pages.map((child) => (
                        <li key={child.href}>
                          <Link onClick={closeAll} href={child.href} aria-current={isCurrent(pathname, child.href) ? 'page' : undefined}>
                            <span className="site-nav__submenu-label">{child.label}</span>
                            {child.description ? <span className="site-nav__submenu-desc">{child.description}</span> : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <p className="site-nav__submenu-overview">
                      <Link onClick={closeAll} href={overview.href} aria-current={isCurrent(pathname, overview.href) ? 'page' : undefined}>
                        {overview.label}
                        <ArrowRight size={16} aria-hidden="true" />
                      </Link>
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="site-nav__actions">
            <li>
              <Link
                onClick={closeAll}
                href={headerActions.primary.href}
                className="cta cta--primary"
                aria-current={isCurrent(pathname, headerActions.primary.href) ? 'page' : undefined}
              >
                {headerActions.primary.label}
              </Link>
            </li>
            <li>
              <a href={headerActions.login.href} className="cta cta--secondary" onClick={closeAll}>
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
