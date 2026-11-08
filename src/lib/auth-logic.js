/**
 * DevSparks DeployCheck — Core Authentication & Validation Logic (.js)
 * Pure JavaScript utility functions for authentication, password evaluation, and validation.
 */

export const POPULAR_EMAIL_DOMAINS = [
  { domain: "gmail.com", provider: "Google" },
  { domain: "outlook.com", provider: "Microsoft Outlook" },
  { domain: "hotmail.com", provider: "Microsoft Hotmail" },
  { domain: "yahoo.com", provider: "Yahoo Mail" },
  { domain: "yahoo.co.in", provider: "Yahoo India" },
  { domain: "proton.me", provider: "Proton Mail" },
  { domain: "protonmail.com", provider: "Proton AG" },
  { domain: "icloud.com", provider: "Apple iCloud" },
  { domain: "zoho.com", provider: "Zoho Mail" },
  { domain: "rediffmail.com", provider: "Rediffmail" },
  { domain: "fastmail.com", provider: "Fastmail" },
];

/**
 * Generates email domain autocomplete suggestions given the user's current input.
 * Triggered when input contains '@'.
 *
 * @param {string} input - The raw email input string
 * @returns {{ prefix: string, query: string, suggestions: Array<{ domain: string, provider: string, fullEmail: string }> }}
 */
export function getEmailDomainSuggestions(input) {
  if (!input || typeof input !== "string" || !input.includes("@")) {
    return { prefix: "", query: "", suggestions: [] };
  }

  const atIndex = input.lastIndexOf("@");
  const prefix = input.slice(0, atIndex).trim();
  const query = input.slice(atIndex + 1).toLowerCase().trim();

  if (!prefix) {
    return { prefix: "", query: "", suggestions: [] };
  }

  const filtered = POPULAR_EMAIL_DOMAINS.filter((item) =>
    item.domain.toLowerCase().startsWith(query)
  );

  return {
    prefix,
    query,
    suggestions: filtered.map((item) => ({
      domain: item.domain,
      provider: item.provider,
      fullEmail: `${prefix}@${item.domain}`,
    })),
  };
}

/**
 * Calculates password strength score (0 to 4) adhering to NIST 800-63B.
 * Minimum target: 15 characters. Passphrases with spaces are strongly rewarded.
 *
 * @param {string} password
 * @returns {{ score: number, label: string, color: string, percentage: number, feedback: string }}
 */
export function calculatePasswordStrength(password) {
  if (!password || typeof password !== "string") {
    return { score: 0, label: "Empty", color: "#EF4444", percentage: 0, feedback: "Enter a passphrase of 15+ characters." };
  }

  const length = password.length;
  const hasSpaces = /\s/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /[0-9]/.test(password);
  const hasSymbols = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/.test(password);

  // Level 0: Very Weak (< 10 chars)
  if (length < 10) {
    return {
      score: 0,
      label: "Very Weak",
      color: "#EF4444", // Red
      percentage: 15,
      feedback: "Too short. Minimum 15 characters required.",
    };
  }

  // Level 1: Weak (10 to 14 chars)
  if (length < 15) {
    return {
      score: 1,
      label: "Weak",
      color: "#F97316", // Orange
      percentage: 35,
      feedback: `Need ${15 - length} more character${15 - length > 1 ? "s" : ""} to reach minimum 15 characters.`,
    };
  }

  // Meets 15 character threshold
  let varietyScore = 0;
  if (hasUppercase) varietyScore++;
  if (hasLowercase) varietyScore++;
  if (hasNumbers) varietyScore++;
  if (hasSymbols) varietyScore++;
  if (hasSpaces) varietyScore += 2; // Passphrases reward

  // Level 4: Very Strong (20+ chars or high complexity 16+ chars)
  if (length >= 20 || (length >= 16 && varietyScore >= 4)) {
    return {
      score: 4,
      label: "Very Strong",
      color: "#16A34A", // Emerald
      percentage: 100,
      feedback: "Exceptional passphrase length and entropy.",
    };
  }

  // Level 3: Strong (15+ chars with good variety or multiple words)
  if (varietyScore >= 3 || (hasSpaces && length >= 15)) {
    return {
      score: 3,
      label: "Strong",
      color: "#5938F5", // Brand Purple
      percentage: 80,
      feedback: "Great passphrase strength. Meets NIST standards.",
    };
  }

  // Level 2: Fair (15+ chars but basic)
  return {
    score: 2,
    label: "Fair",
    color: "#EAB308", // Amber
    percentage: 55,
    feedback: "Good length. Adding spaces, numbers, or symbols will increase strength.",
  };
}

/**
 * Validates whether an email string meets standard format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}

/**
 * Validates signup payload inputs.
 * @param {{ name?: string, email?: string, password?: string, confirmPassword?: string, acceptTerms?: boolean }} data
 * @returns {{ valid: boolean, error?: string }}
 */
export function validateSignupInput(data) {
  if (!data.name || data.name.trim().length < 2) {
    return { valid: false, error: "Please enter your full name (at least 2 characters)." };
  }
  if (!isValidEmail(data.email || "")) {
    return { valid: false, error: "Please enter a valid work email address." };
  }
  if (!data.password || data.password.length < 15) {
    return { valid: false, error: "Password must be at least 15 characters long." };
  }
  if (data.password.length > 128) {
    return { valid: false, error: "Password must not exceed 128 characters." };
  }
  if (data.password !== data.confirmPassword) {
    return { valid: false, error: "Passwords do not match." };
  }
  if (!data.acceptTerms) {
    return { valid: false, error: "You must agree to the Terms of Service and Privacy Policy." };
  }

  const strength = calculatePasswordStrength(data.password);
  if (strength.score < 2) {
    return { valid: false, error: "Please choose a stronger passphrase (at least 15 characters)." };
  }

  return { valid: true };
}

/**
 * Provides developer test account credentials.
 * @param {"super" | "admin"} type
 * @returns {{ email: string, password: string, name?: string }}
 */
export function getTestCredentials(type) {
  if (type === "super") {
    return {
      name: "Nikhil Dhawan",
      email: "nikhil@devsparksindia.com",
      password: "DevSparks@2026!",
    };
  }
  return {
    name: "ACS Administrator",
    email: "admin.test@acs-solar.local",
    password: "ChangeMe_Admin_2026!",
  };
}

