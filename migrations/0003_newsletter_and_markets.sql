-- Migration: 0003_newsletter_and_markets.sql
-- Description: Developer Newsletter Subscriptions, International Markets, and Regional Plan Pricing

-- 1. Newsletter Subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  status VARCHAR(32) NOT NULL DEFAULT 'pending_confirmation',
  confirmation_token VARCHAR(128),
  token_expires_at TIMESTAMP WITH TIME ZONE,
  consent_timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  policy_version VARCHAR(32) NOT NULL DEFAULT 'v1.0',
  ip_address VARCHAR(64),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_newsletter_status ON newsletter_subscriptions(status);

-- 2. International Markets Registry
CREATE TABLE IF NOT EXISTS markets (
  id VARCHAR(32) PRIMARY KEY,
  slug VARCHAR(8) NOT NULL UNIQUE,
  country_code VARCHAR(4) NOT NULL,
  display_name VARCHAR(64) NOT NULL,
  currency_code VARCHAR(8) NOT NULL,
  currency_symbol VARCHAR(8) NOT NULL,
  locale VARCHAR(16) NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Seed Supported Markets
INSERT INTO markets (id, slug, country_code, display_name, currency_code, currency_symbol, locale, is_active)
VALUES
  ('mkt_in', 'in', 'IN', 'India', 'INR', '₹', 'en-IN', true),
  ('mkt_uk', 'uk', 'GB', 'United Kingdom', 'GBP', '£', 'en-GB', true),
  ('mkt_us', 'us', 'US', 'United States', 'USD', '$', 'en-US', true)
ON CONFLICT (slug) DO NOTHING;

-- 3. Regional Plan Pricing (amounts in minor currency units: paise, pence, cents)
CREATE TABLE IF NOT EXISTS regional_plan_prices (
  id VARCHAR(64) PRIMARY KEY,
  plan_id VARCHAR(32) NOT NULL,
  market_id VARCHAR(32) NOT NULL REFERENCES markets(id) ON DELETE CASCADE,
  currency_code VARCHAR(8) NOT NULL,
  amount_minor_units INTEGER NOT NULL,
  billing_interval VARCHAR(16) NOT NULL DEFAULT 'monthly',
  trial_days INTEGER NOT NULL DEFAULT 14,
  tax_display_mode VARCHAR(32) NOT NULL DEFAULT 'tax_exclusive',
  tax_note VARCHAR(64),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_plan_prices_market ON regional_plan_prices(market_id, plan_id);

-- Seed Regional Pricing for Free, Pro, and Enterprise
INSERT INTO regional_plan_prices (id, plan_id, market_id, currency_code, amount_minor_units, billing_interval, trial_days, tax_display_mode, tax_note)
VALUES
  -- Free Tier (All Markets)
  ('price_free_in', 'free', 'mkt_in', 'INR', 0, 'monthly', 0, 'tax_inclusive', 'Free forever'),
  ('price_free_uk', 'free', 'mkt_uk', 'GBP', 0, 'monthly', 0, 'tax_inclusive', 'Free forever'),
  ('price_free_us', 'free', 'mkt_us', 'USD', 0, 'monthly', 0, 'tax_inclusive', 'Free forever'),

  -- Pro Tier: India ₹999/mo (99,900 paise), UK £9.99/mo (999 pence), US $12.99/mo (1,299 cents)
  ('price_pro_in', 'pro', 'mkt_in', 'INR', 99900, 'monthly', 14, 'tax_exclusive', '+ 18% GST'),
  ('price_pro_uk', 'pro', 'mkt_uk', 'GBP', 999, 'monthly', 14, 'tax_inclusive', 'VAT included'),
  ('price_pro_us', 'pro', 'mkt_us', 'USD', 1299, 'monthly', 14, 'tax_exclusive', 'Excl. state sales tax'),

  -- Enterprise Tier: India ₹4,999/mo, UK £49.99/mo, US $69.99/mo
  ('price_ent_in', 'enterprise', 'mkt_in', 'INR', 499900, 'monthly', 30, 'tax_exclusive', '+ 18% GST'),
  ('price_ent_uk', 'enterprise', 'mkt_uk', 'GBP', 4999, 'monthly', 30, 'tax_inclusive', 'VAT included'),
  ('price_ent_us', 'enterprise', 'mkt_us', 'USD', 6999, 'monthly', 30, 'tax_exclusive', 'Excl. state sales tax')
ON CONFLICT (id) DO NOTHING;
