"use client";

import React, { useState } from "react";
import { Zap, Check, Eye, EyeOff } from "../common/Icons";

export function AuthView() {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("nikhil@devsparksindia.com");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthSuccess(true);
    setTimeout(() => setAuthSuccess(false), 4000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-8 space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5938F5] to-[#3988F7] text-white flex items-center justify-center font-black text-2xl shadow-md mx-auto">
            <Zap size={24} className="text-white" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-[#17172A]">
            {authMode === "signin" ? "Developer Sign In" : "Create Developer Account"}
          </h2>
          <p className="text-xs text-[#667085]">
            DevSparks DeployCheck • Open-Source Developer Operations
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex bg-[#F7F8FC] p-1 rounded-xl border border-[#E5E7EB] text-xs font-bold">
          <button
            onClick={() => setAuthMode("signin")}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authMode === "signin" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode("signup")}
            className={`flex-1 py-2 rounded-lg transition-all ${
              authMode === "signup" ? "bg-white text-[#5938F5] shadow-sm" : "text-[#667085]"
            }`}
          >
            Create Account
          </button>
        </div>

        {authSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
            <Check size={14} className="text-[#16A34A] shrink-0" />
            <span>Authentication session initialized for {email}.</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-[#17172A] mb-1">Developer Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl px-3 py-2.5 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#17172A]">Password</label>
              {authMode === "signin" && (
                <button type="button" className="text-[11px] font-semibold text-[#5938F5] hover:underline">
                  Forgot Password?
                </button>
              )}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#F7F8FC] border border-[#E5E7EB] rounded-xl pl-3 pr-10 py-2.5 text-xs text-[#17172A] focus:outline-none focus:border-[#5938F5]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-[#17172A] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#5938F5] hover:bg-[#4726DB] text-white font-bold rounded-xl text-xs shadow-md transition-all mt-2"
          >
            {authMode === "signin" ? "Sign In to Workspace" : "Register Workspace Account"}
          </button>
        </form>

        <div className="pt-4 border-t border-[#F1F4F9] text-center text-[11px] text-[#667085]">
          Strict Light Theme Design • Encrypted Credentials • DevSparks India
        </div>
      </div>
    </div>
  );
}
