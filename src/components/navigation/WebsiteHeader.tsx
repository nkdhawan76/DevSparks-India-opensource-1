"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Zap, ChevronDown, Menu, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductMegaMenu } from "./ProductMegaMenu";
import { SolutionsMegaMenu } from "./SolutionsMegaMenu";
import { ResourcesMegaMenu } from "./ResourcesMegaMenu";
import { OpenSourceDropdown } from "./OpenSourceDropdown";
import { MobileNavigationDrawer } from "./MobileNavigationDrawer";

type ActiveMenu = "product" | "solutions" | "resources" | "opensource" | null;

export function WebsiteHeader() {
  const [activeMenu, setActiveMenu] = useState<ActiveMenu>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const leaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    }, 150);
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
    <div ref={navContainerRef} className="relative w-full z-40 select-none">
      {/* Floating Header Container */}
      <header className="max-w-6xl mx-auto w-full py-2 px-3 sm:px-5 rounded-2xl bg-white/90 border border-slate-200/90 shadow-xs backdrop-blur-md flex items-center justify-between text-xs">
        {/* Left: Brand Identity (DeployCheck By DevSparks India) */}
        <Link href="/" onClick={closeMenu} className="inline-flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-[8px] bg-[#5938F5] text-white flex items-center justify-center font-bold shadow-xs group-hover:bg-[#4726DB] group-hover:scale-105 active:scale-95 transition-all">
            <Zap className="h-4 w-4 fill-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-sm text-[#17172A] tracking-tight leading-none group-hover:text-[#5938F5] transition-colors">
              DeployCheck
            </span>
            <span className="text-[9.5px] text-slate-400 font-medium leading-tight mt-0.5">
              By DevSparks India
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Bar with Mega Menus */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Product Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("product")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveMenu(activeMenu === "product" ? null : "product")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeMenu === "product"
                  ? "bg-purple-50 text-[#5938F5]"
                  : "text-slate-700 hover:text-[#17172A] hover:bg-slate-50"
              }`}
              aria-expanded={activeMenu === "product"}
            >
              <span>Product</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
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
              onClick={() => setActiveMenu(activeMenu === "solutions" ? null : "solutions")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeMenu === "solutions"
                  ? "bg-purple-50 text-[#5938F5]"
                  : "text-slate-700 hover:text-[#17172A] hover:bg-slate-50"
              }`}
              aria-expanded={activeMenu === "solutions"}
            >
              <span>Solutions</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
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
              onClick={() => setActiveMenu(activeMenu === "resources" ? null : "resources")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeMenu === "resources"
                  ? "bg-purple-50 text-[#5938F5]"
                  : "text-slate-700 hover:text-[#17172A] hover:bg-slate-50"
              }`}
              aria-expanded={activeMenu === "resources"}
            >
              <span>Resources</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeMenu === "resources" ? "rotate-180 text-[#5938F5]" : "text-slate-400"
                }`}
              />
            </button>
          </div>

          {/* Open Source Dropdown Trigger */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("opensource")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => setActiveMenu(activeMenu === "opensource" ? null : "opensource")}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeMenu === "opensource"
                  ? "bg-purple-50 text-[#5938F5]"
                  : "text-slate-700 hover:text-[#17172A] hover:bg-slate-50"
              }`}
              aria-expanded={activeMenu === "opensource"}
            >
              <span>Open Source</span>
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  activeMenu === "opensource" ? "rotate-180 text-[#5938F5]" : "text-slate-400"
                }`}
              />
            </button>
          </div>

          {/* Pricing Direct Link */}
          <Link
            href="/documentation"
            onClick={closeMenu}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-[#17172A] hover:bg-slate-50 transition-colors"
          >
            Pricing
          </Link>
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/documentation"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-[#17172A] hover:bg-slate-50 transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5 text-slate-400" />
            <span>Documentation</span>
          </Link>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="h-8 rounded-[8px] px-3.5 text-xs font-semibold border-[#E5E7EB] hover:bg-slate-50 text-[#17172A]"
          >
            <Link href="/login">Sign In</Link>
          </Button>

          <Button
            size="sm"
            asChild
            className="h-8 rounded-[8px] px-3.5 text-xs font-bold bg-[#5938F5] hover:bg-[#4726DB] text-white shadow-2xs gap-1.5"
          >
            <Link href="/signup">
              <span>Get Started Free</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          <Button
            size="sm"
            asChild
            className="h-7.5 rounded-[8px] px-2.5 text-[11px] font-bold bg-[#5938F5] text-white"
          >
            <Link href="/signup">Get Started</Link>
          </Button>

          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Floating Mega Menu Panels Layer */}
      {activeMenu && (
        <div
          className="absolute top-full left-0 right-0 mt-2 flex justify-center z-50 pointer-events-auto animate-in fade-in-0 zoom-in-95 duration-150"
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
          {activeMenu === "opensource" && <OpenSourceDropdown onClose={closeMenu} />}
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
