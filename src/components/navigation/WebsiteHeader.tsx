"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GitHubIcon, DeployCheckLogo } from "@/components/common/Icons";
import { ProductMegaMenu } from "./ProductMegaMenu";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";
import { ResourcesMegaMenu } from "./ResourcesMegaMenu";
import { OpenSourceDropdown } from "./OpenSourceDropdown";
import { MobileNavigationDrawer } from "./MobileNavigationDrawer";

type ActiveMenu = "product" | "solutions" | "resources" | "opensource" | null;

export function WebsiteHeader() {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Track window scroll for sticky visual elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = (menu: ActiveMenu) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveMenu((prev) => (prev === menu ? null : menu));
  };

  const handleMouseEnter = (menu: ActiveMenu) => {
    if (leaveTimeoutRef.current) {
      clearTimeout(leaveTimeoutRef.current);
      leaveTimeoutRef.current = null;
    }
    setActiveMenu(menu);
  };

  const handleMouseLeave = () => {
    leaveTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 280);
  };

  const closeMenu = () => {
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    setActiveMenu(null);
  };

  // Close on Escape & click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={navContainerRef}
      className={`sticky top-2 sm:top-3.5 w-full z-50 select-none transition-all duration-200 ${
        isScrolled ? "py-0.5" : "py-0"
      }`}
    >
      {/* Floating Sticky Header Container */}
      <header
        className={`max-w-6xl mx-auto w-full py-1.5 px-3 sm:px-4 rounded-2xl border transition-colors transition-shadow duration-200 backdrop-blur-md flex items-center justify-between text-xs opacity-100 visible ${
          isScrolled
            ? "bg-white/95 border-slate-300/90 shadow-md shadow-slate-300/30 ring-1 ring-slate-200/50"
            : "bg-white/90 border-slate-200/90 shadow-xs"
        }`}
      >
        {/* Left: Brand Identity (DeployCheck By DevSparks India) */}
        <Link href="/" onClick={closeMenu} className="inline-flex items-center gap-2.5 group shrink-0 py-0.5">
          <DeployCheckLogo
            size={32}
            className="w-8 h-8 shrink-0 shadow-xs transition-transform duration-150 group-hover:scale-105 active:scale-95"
            aria-hidden="true"
          />
          <div className="flex flex-col">
            <span className="font-extrabold text-[13.5px] text-[#17172A] tracking-tight leading-none group-hover:text-[#5938F5] transition-colors">
              DeployCheck
            </span>
            <span className="text-[9.5px] text-slate-400 font-medium leading-tight mt-0.5">
              By DevSparks India
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Bar with Mega Menus */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {/* Product Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("product")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu("product");
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] text-[11.5px] font-semibold transition-colors cursor-pointer ${
                activeMenu === "product"
                  ? "bg-purple-50 text-[#5938F5]"
                  : "text-slate-700 hover:text-[#17172A] hover:bg-slate-50"
              }`}
              aria-expanded={activeMenu === "product"}
            >
              <span>Product</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${
                  activeMenu === "product" ? "rotate-180 text-[#5938F5]" : "text-slate-400"
                }`}
              />
            </button>
          </div>

          {/* Solutions Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("solutions")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu("solutions");
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] text-[11.5px] font-semibold transition-colors cursor-pointer ${
                activeMenu === "solutions"
                  ? "bg-purple-50 text-[#5938F5]"
                  : "text-slate-700 hover:text-[#17172A] hover:bg-slate-50"
              }`}
              aria-expanded={activeMenu === "solutions"}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${
                  activeMenu === "solutions" ? "rotate-180 text-[#5938F5]" : "text-slate-400"
                }`}
              />
            </button>
          </div>

          {/* Resources Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("resources")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu("resources");
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] text-[11.5px] font-semibold transition-colors cursor-pointer ${
                activeMenu === "resources"
                  ? "bg-purple-50 text-[#5938F5]"
                  : "text-slate-700 hover:text-[#17172A] hover:bg-slate-50"
              }`}
              aria-expanded={activeMenu === "resources"}
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${
                  activeMenu === "resources" ? "rotate-180 text-[#5938F5]" : "text-slate-400"
                }`}
              />
            </button>
          </div>

          {/* Open Source Dropdown Trigger with Direct Child Anchor */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("opensource")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleMenu("opensource");
              }}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] text-[11.5px] font-semibold transition-colors cursor-pointer ${
                activeMenu === "opensource"
                  ? "bg-purple-50 text-[#5938F5]"
                  : "text-slate-700 hover:text-[#17172A] hover:bg-slate-50"
              }`}
              aria-expanded={activeMenu === "opensource"}
            >
              <span>Open Source</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${
                  activeMenu === "opensource" ? "rotate-180 text-[#5938F5]" : "text-slate-400"
                }`}
              />
            </button>

            {/* Anchored Open Source Dropdown right below the trigger */}
            {activeMenu === "opensource" && (
              <div
                className="absolute top-full left-0 pt-2 z-50 pointer-events-auto before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
                onMouseEnter={() => {
                  if (leaveTimeoutRef.current) {
                    clearTimeout(leaveTimeoutRef.current);
                    leaveTimeoutRef.current = null;
                  }
                }}
                onMouseLeave={handleMouseLeave}
              >
                <OpenSourceDropdown onClose={closeMenu} />
              </div>
            )}
          </div>

          {/* Pricing Direct Link */}
          <Link
            href="/pricing"
            onClick={closeMenu}
            className="px-2.5 py-1.5 rounded-[8px] text-[11.5px] font-semibold text-slate-700 hover:text-[#17172A] hover:bg-slate-50 transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <a
            href="https://github.com/nkdhawan76/DevSparks-India-opensource-1"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] text-xs font-semibold text-slate-700 hover:text-[#17172A] hover:bg-slate-50 transition-colors group"
            title="DeployCheck on GitHub"
            aria-label="GitHub Repository"
          >
            <GitHubIcon size={14} className="text-[#17172A] group-hover:scale-110 transition-transform duration-150" />
            <span>GitHub</span>
          </a>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-8 rounded-[8px] px-3.5 text-xs font-semibold border-[#E5E7EB] hover:bg-slate-50 text-[#17172A] shadow-2xs"
          >
            <Link href="/login">Sign In</Link>
          </Button>

          <Button
            size="sm"
            asChild
            className="h-8 rounded-[8px] px-3.5 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-2xs gap-1.5 group"
          >
            <Link href="/signup">
              <span>Get Started Free</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            size="sm"
            asChild
            className="h-8 rounded-[8px] px-3 text-xs font-bold bg-[#5938F5] text-white hidden sm:inline-flex"
          >
            <Link href="/signup">Get Started</Link>
          </Button>

          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-1.5 rounded-[8px] text-slate-600 hover:text-[#17172A] hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>
        </div>
      </header>

      {/* Centered Mega Menu Floating Layer (Product, Solutions, Resources) */}
      {activeMenu && activeMenu !== "opensource" && (
        <div
          className="absolute top-full left-0 right-0 pt-2 flex justify-center z-50 pointer-events-auto before:absolute before:-top-3 before:left-0 before:right-0 before:h-4 before:content-['']"
          onMouseEnter={() => {
            if (leaveTimeoutRef.current) {
              clearTimeout(leaveTimeoutRef.current);
              leaveTimeoutRef.current = null;
            }
          }}
          onMouseLeave={handleMouseLeave}
        >
          {activeMenu === "product" && <ProductMegaMenu onClose={closeMenu} />}
          {activeMenu === "solutions" && <SolutionsMegaMenu onClose={closeMenu} />}
          {activeMenu === "resources" && <ResourcesMegaMenu onClose={closeMenu} />}
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      <MobileNavigationDrawer
        isOpen={mobileDrawerOpen}
        onClose={() => setMobileDrawerOpen(false)}
      />
    </div>
  );
}
