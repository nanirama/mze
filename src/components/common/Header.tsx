'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
interface MenuItem {
  name: string;
  slug: string;
}

interface HeaderProps {
  menuItems?: MenuItem[];
}

// ─── Constants ────────────────────────────────────────────────────────────────
const defaultMenuItems: MenuItem[] = [
  {
    name: 'რაიონები',
    slug: '/raionebi',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Header({ menuItems = defaultMenuItems }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Scroll shadow effect — no layout shift (uses box-shadow, not height/border)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on outside click
  const handleOutsideClick = useCallback((e: MouseEvent) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(e.target as Node) &&
      !toggleRef.current?.contains(e.target as Node)
    ) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen, handleOutsideClick]);

  // Close menu on ESC key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      {/* Skip to main content — accessibility */}
      <a
        href="#main-content"
        className="
          sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999]
          focus:bg-amber-500 focus:text-white focus:px-4 focus:py-2
          focus:rounded-md focus:text-sm focus:font-semibold
          focus:outline-none focus:ring-2 focus:ring-amber-700
          transition-all
        "
      >
        მთავარ კონტენტზე გადასვლა
      </a>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        role="banner"
        className={`
          sticky top-0 z-50 w-full bg-white
          transition-shadow duration-200 ease-in-out
          ${isScrolled ? 'shadow-[0_2px_12px_rgba(0,0,0,0.08)]' : 'shadow-none'}
        `}
      >
        {/* Inner container — max-width + horizontal padding */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex h-16 items-center justify-between md:h-[70px] ">

            {/* ── Logo ───────────────────────────────────────────────────── */}
            <Link
              href="/"
              aria-label="მზე — მთავარ გვერდზე გადასვლა"
              className="
                group flex shrink-0 items-center gap-2.5
                rounded-md outline-none
                focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
              "
              style={{ maxWidth: '300px' }}
            >
              {/*
                next/image with explicit width/height prevents CLS (Cumulative Layout Shift).
                priority prop fetches the LCP image eagerly (no lazy load penalty).
              */}
              <Image
                src="/assets/images/logo.png"
                alt="მზე ლოგო"
                width={180}
                height={80}
                priority
                fetchPriority="high"
                className="
                  w-[180px] h-[80px]
                  object-contain
                  transition-transform duration-200 group-hover:scale-105
                "
              />
            </Link>

            {/* ── Desktop Navigation ─────────────────────────────────────── */}
            <nav
              aria-label="მთავარი ნავიგაცია"
              className="hidden md:block"
            >
              <ul
                role="list"
                className="flex items-center gap-1"
              >
                {menuItems.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={item.slug}
                      className="
                        relative inline-flex items-center px-3 py-2
                        text-base font-bold text-[#718096]
                        rounded-md
                        transition-colors duration-150
                        hover:text-amber-500
                        focus-visible:outline-none
                        focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
                        group
                      "
                    >
                      {item.name}
                      {/* Animated underline */}
                      <span
                        aria-hidden="true"
                        className="
                          absolute bottom-1 left-3 right-3 h-[2px]
                          bg-amber-400 rounded-full
                          scale-x-0 origin-left
                          transition-transform duration-200 ease-out
                          group-hover:scale-x-100
                        "
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* ── Mobile Hamburger Button ────────────────────────────────── */}
            <button
              ref={toggleRef}
              type="button"
              aria-label={isMenuOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={toggleMenu}
              className="
                md:hidden
                inline-flex items-center justify-center
                h-10 w-10 rounded-lg
                text-gray-500 hover:text-amber-500
                hover:bg-amber-50
                transition-colors duration-150
                focus-visible:outline-none
                focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2
              "
            >
              {/* Animated hamburger ↔ X icon */}
              <span className="sr-only">
                {isMenuOpen ? 'მენიუს დახურვა' : 'მენიუს გახსნა'}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                focusable="false"
                className="h-5 w-5"
              >
                {isMenuOpen ? (
                  /* X icon */
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  /* Hamburger icon */
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Drawer ─────────────────────────────────────────────

        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="მობილური მენიუ"
          hidden={!isMenuOpen}
          className={`
            md:hidden
            overflow-hidden border-t border-gray-100
            bg-white
            transition-[max-height,opacity] duration-300 ease-in-out
            ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
          style={{ display: isMenuOpen ? undefined : 'none' }}
        >
          <nav aria-label="მობილური ნავიგაცია">
            <ul role="list" className="px-4 pb-4 pt-2 space-y-1">
              {menuItems.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={item.slug}
                    onClick={closeMenu}
                    className="
                      flex items-center px-3 py-3
                      text-base font-medium text-gray-700
                      rounded-lg
                      hover:bg-amber-50 hover:text-amber-600
                      transition-colors duration-150
                      focus-visible:outline-none
                      focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1
                    "
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div> */}
      </header>
    </>
  );
}