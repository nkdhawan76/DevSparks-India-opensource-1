/**
 * DevSparks DeployCheck — Core Authentication & Validation Logic (.js)
 * Pure JavaScript utility functions for authentication, password evaluation, and validation.
 */

/**
 * Calculates password strength score (0 to 4) and associated metadata.
 * @param {string} password
 * @returns {{ score: number, label: string, color: string, percentage: number }}
 */
export function calculatePasswordStrength(password) {
  if (!password || typeof password !== "string") {
    return { score: 0, label: "Empty", color: "#EF4444", percentage: 0 };
  }

  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumberOrSymbol = /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  const criteriaMet = [hasMinLength, hasUppercase, hasLowercase, hasNumberOrSymbol].filter(Boolean);
  const score = criteriaMet.length;

  let label = "Weak";
  let color = "#EF4444"; // red

  if (score >= 4) {
    label = "Strong";
    color = "#16A34A"; // emerald
  } else if (score === 3) {
    label = "Medium";
    color = "#5938F5"; // brand purple
  } else if (score === 2) {
    label = "Fair";
    color = "#EAB308"; // yellow
  }

  const percentage = Math.min(100, Math.max(15, score * 25));

  return { score, label, color, percentage };
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
  if (!data.password || data.password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters." };
  }
  if (data.password !== data.confirmPassword) {
    return { valid: false, error: "Passwords do not match." };
  }
  if (!data.acceptTerms) {
    return { valid: false, error: "You must agree to the Terms of Use and Privacy Policy." };
  }

  const strength = calculatePasswordStrength(data.password);
  if (strength.score < 3) {
    return { valid: false, error: "Please choose a stronger password (mixed case, numbers/symbols)." };
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

