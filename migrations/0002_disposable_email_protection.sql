-- DevSparks DeployCheck — Migration 0002: Disposable Email Protection & Domain Intelligence
-- Enforces zero-tolerance against throwaway/burner domains while safeguarding legitimate providers.

CREATE TABLE IF NOT EXISTS disposable_email_domains (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(255) NOT NULL UNIQUE,
    source VARCHAR(100) NOT NULL DEFAULT 'disposable-email-domains',
    source_version VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_verified_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX IF NOT EXISTS idx_disposable_domains_domain ON disposable_email_domains(domain);

-- Inviolable Allowlist for legitimate email domains (Gmail, Outlook, Zoho, Proton, etc.)
CREATE TABLE IF NOT EXISTS email_domain_allowlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(255) NOT NULL UNIQUE,
    reason TEXT,
    created_by VARCHAR(255) DEFAULT 'system',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_email_domain_allowlist_domain ON email_domain_allowlist(domain);

-- Administrative Overrides (ALLOW or BLOCK specific domains manually)
CREATE TABLE IF NOT EXISTS email_domain_overrides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(10) NOT NULL CHECK (status IN ('ALLOW', 'BLOCK')),
    reason TEXT,
    created_by VARCHAR(255) DEFAULT 'admin',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_email_domain_overrides_domain ON email_domain_overrides(domain);

-- Audit sync logs for upstream blocklist updates
CREATE TABLE IF NOT EXISTS email_blocklist_sync_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(100) NOT NULL,
    previous_version VARCHAR(50),
    current_version VARCHAR(50),
    domains_added INT NOT NULL DEFAULT 0,
    domains_removed INT NOT NULL DEFAULT 0,
    sync_status VARCHAR(20) NOT NULL,
    synced_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial core legitimate allowlist
INSERT INTO email_domain_allowlist (domain, reason) VALUES
    ('gmail.com', 'Google Workspace / Consumer Mail'),
    ('googlemail.com', 'Google Consumer Mail legacy'),
    ('outlook.com', 'Microsoft 365 / Outlook Consumer'),
    ('hotmail.com', 'Microsoft Hotmail legacy'),
    ('live.com', 'Microsoft Live legacy'),
    ('msn.com', 'Microsoft MSN legacy'),
    ('yahoo.com', 'Yahoo Mail global'),
    ('yahoo.co.in', 'Yahoo Mail India'),
    ('icloud.com', 'Apple iCloud Mail'),
    ('me.com', 'Apple MobileMe legacy'),
    ('proton.me', 'Proton AG privacy mail'),
    ('protonmail.com', 'Proton AG legacy'),
    ('tuta.com', 'Tuta Mail secure'),
    ('tutanota.com', 'Tutanota legacy'),
    ('zoho.com', 'Zoho Workplace & Mail'),
    ('rediffmail.com', 'Rediffmail India'),
    ('fastmail.com', 'Fastmail secure'),
    ('devsparks.in', 'DevSparks India primary domain'),
    ('devsparksindia.com', 'DevSparks India secondary domain')
ON CONFLICT (domain) DO NOTHING;
