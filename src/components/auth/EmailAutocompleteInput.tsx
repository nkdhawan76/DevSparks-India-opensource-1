"use client";

import React, { useState, useRef, useEffect } from "react";
import { Mail, Check } from "lucide-react";
import { getEmailDomainSuggestions } from "@/lib/auth-logic";

interface EmailAutocompleteInputProps {
  id?: string;
  name?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  hasError?: boolean;
  className?: string;
}

export function EmailAutocompleteInput({
  id = "email",
  name = "email",
  value,
  onChange,
  onBlur,
  disabled = false,
  required = true,
  placeholder = "name@company.com",
  hasError = false,
  className = "",
}: EmailAutocompleteInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { suggestions, query } = getEmailDomainSuggestions(value);
  const showDropdown = isOpen && suggestions.length > 0 && !disabled;

  useEffect(() => {
    // Reset highlighted index when suggestions change
    setHighlightedIndex(0);
  }, [suggestions.length, query]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (fullEmail: string) => {
    onChange(fullEmail);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
    } else if (e.key === "Enter" || e.key === "Tab") {
      if (suggestions[highlightedIndex]) {
        e.preventDefault();
        handleSelect(suggestions[highlightedIndex].fullEmail);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Mail
          className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors ${
            hasError ? "text-rose-500" : "text-[#667085]"
          }`}
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          required={required}
          disabled={disabled}
          value={value}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-autocomplete="list"
          aria-controls={showDropdown ? `${id}-suggestions` : undefined}
          aria-expanded={showDropdown}
          onChange={(e) => {
            onChange(e.target.value);
            if (e.target.value.includes("@")) {
              setIsOpen(true);
            }
          }}
          onFocus={() => {
            if (value.includes("@")) {
              setIsOpen(true);
            }
          }}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          className={`w-full pl-10 pr-4 py-2.5 bg-white text-sm text-[#17172A] placeholder:text-[#667085]/70 border rounded-[8px] focus:outline-hidden focus:ring-2 focus:ring-[#5938F5]/20 focus:border-[#5938F5] transition-all shadow-2xs ${
            hasError
              ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20"
              : "border-[#E5E7EB] hover:border-slate-300"
          } ${className}`}
        />
      </div>

      {/* Domain Suggestion Dropdown */}
      {showDropdown && (
        <ul
          id={`${id}-suggestions`}
          role="listbox"
          aria-label="Email domain suggestions"
          className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#E5E7EB] rounded-[8px] shadow-lg shadow-slate-200/50 py-1.5 max-h-56 overflow-auto font-sans text-xs focus:outline-hidden"
        >
          <li className="px-3 py-1 text-[10px] font-semibold tracking-wider text-slate-400 uppercase select-none">
            Suggested Domains
          </li>
          {suggestions.map((item, index) => {
            const isHighlighted = index === highlightedIndex;
            return (
              <li
                key={item.domain}
                role="option"
                aria-selected={isHighlighted}
                onMouseEnter={() => setHighlightedIndex(index)}
                onClick={() => handleSelect(item.fullEmail)}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${
                  isHighlighted ? "bg-purple-50 text-[#5938F5]" : "text-[#17172A] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-semibold text-[#17172A]">{value.slice(0, value.indexOf("@") + 1)}</span>
                  <span className={isHighlighted ? "text-[#5938F5] font-bold" : "text-[#5938F5] font-medium"}>
                    {item.domain}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-2">
                  <span className="text-[10px] text-[#667085] bg-slate-100 px-1.5 py-0.5 rounded-sm">
                    {item.provider}
                  </span>
                  {isHighlighted && <Check className="h-3 w-3 text-[#5938F5]" />}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

