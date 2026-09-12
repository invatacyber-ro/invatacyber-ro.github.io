import fs from 'node:fs';
import path from 'node:path';
import { load as parseYaml } from 'js-yaml';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PHOTO_DIR = path.join(process.cwd(), 'public', 'contributors');
const LOGO_DIR = path.join(process.cwd(), 'public', 'supporters');

export const SOCIAL_PLATFORMS = [
  'linkedin',
  'github',
  'x',
  'discord',
  'youtube',
  'instagram',
  'tiktok',
  'twitch',
  'medium',
  'substack',
  'telegram',
  'website',
  'email',
  'hackthebox',
  'tryhackme',
  'credly',
] as const;

export type SocialPlatform = (typeof SOCIAL_PLATFORMS)[number];

export type Contributor = {
  name: string;
  role?: string;
  photo?: string;
  bio?: string;
  tags: string[];
  /** `url` gol = nu e link (ex. username de Discord) → se afiseaza ca badge. */
  links: { platform: SocialPlatform; url: string; label: string; handle?: string }[];
  initials: string;
};

export type Supporter = {
  name: string;
  logo?: string;
  links: { platform: SocialPlatform; url: string; label: string }[];
  initials: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  links: { discord: string; linkedin: string; email?: string };
};

function readYaml<T>(file: string): T | undefined {
  const full = path.join(CONTENT_DIR, file);
  let text: string;
  try {
    text = fs.readFileSync(full, 'utf8');
  } catch (err) {
    throw new Error(
      `Nu am putut citi content/${file}: ${(err as Error).message}`
    );
  }

  // Fisier gol sau numai cu comentarii inseamna "nicio intrare", nu o eroare.
  if (!text.replace(/^\s*#.*$/gm, '').trim()) return undefined;

  try {
    return parseYaml(text) as T;
  } catch (err) {
    throw new Error(
      `Nu am putut parsa content/${file}: ${(err as Error).message}`
    );
  }
}

// Verificam la build time ca imaginea exista, ca sa nu ajunga 404 in producție.
function resolveImage(
  raw: unknown,
  dir: string,
  urlBase: string,
  context: string
): string | undefined {
  const value = typeof raw === 'string' ? raw.trim() : '';
  if (!value) return undefined;

  const file = value.replace(/^.*[\\/]/, '');
  if (fs.existsSync(path.join(dir, file))) return `${urlBase}/${file}`;

  console.warn(
    `${context}: "${file}" nu exista in public${urlBase}/, folosesc inițialele`
  );
  return undefined;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join('');
}

function toUrl(platform: SocialPlatform, raw: string): string {
  const value = raw.trim();
  if (platform === 'email') {
    return value.startsWith('mailto:') ? value : `mailto:${value}`;
  }
  if (platform === 'discord') {
    // Un username Discord nu e un URL, deci se afiseaza ca badge, nu ca link.
    return /^https?:\/\//.test(value) ? value : '';
  }
  return /^https?:\/\//.test(value) ? value : `https://${value}`;
}

const PLATFORM_LABELS: Record<SocialPlatform, string> = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  x: 'X',
  discord: 'Discord',
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  twitch: 'Twitch',
  medium: 'Medium',
  substack: 'Substack',
  telegram: 'Telegram',
  website: 'Website',
  email: 'Email',
  hackthebox: 'Hack The Box',
  tryhackme: 'TryHackMe',
  credly: 'Credly',
};

export function getSite(): SiteConfig {
  const raw = readYaml<Partial<SiteConfig>>('site.yml');
  if (!raw?.links?.discord) {
    throw new Error('content/site.yml: lipseste links.discord');
  }
  return {
    name: raw.name ?? 'InvataCyber.ro',
    tagline: raw.tagline ?? '',
    description: raw.description ?? '',
    url: raw.url ?? 'https://invatacyber.ro',
    links: raw.links as SiteConfig['links'],
  };
}

export function getContributors(): Contributor[] {
  const raw = readYaml<unknown>('contributors.yml');
  if (!Array.isArray(raw)) return [];

  const contributors = raw
    .filter((entry): entry is Record<string, unknown> => {
      if (!entry || typeof entry !== 'object') return false;
      if (!('name' in entry) || typeof entry.name !== 'string') {
        console.warn('[contributors.yml] intrare ignorata: lipseste `name`');
        return false;
      }
      return true;
    })
    .map((entry): Contributor => {
      const name = (entry.name as string).trim();

      const photo = resolveImage(
        entry.photo,
        PHOTO_DIR,
        '/contributors',
        `[contributors.yml] ${name}`
      );

      const rawLinks =
        entry.links && typeof entry.links === 'object'
          ? (entry.links as Record<string, unknown>)
          : {};

      const links = Object.entries(rawLinks)
        .filter(([key, value]) => {
          if (typeof value !== 'string' || !value.trim()) return false;
          if (!SOCIAL_PLATFORMS.includes(key as SocialPlatform)) {
            console.warn(
              `[contributors.yml] ${name}: platforma necunoscuta "${key}", ignorata`
            );
            return false;
          }
          return true;
        })
        .map(([key, value]) => {
          const platform = key as SocialPlatform;
          const raw = (value as string).trim();
          const url = toUrl(platform, raw);
          return {
            platform,
            url,
            label: PLATFORM_LABELS[platform],
            ...(url === '' ? { handle: raw } : {}),
          };
        })
        .filter((link) => link.url !== '' || link.handle !== undefined);

      return {
        name,
        role: typeof entry.role === 'string' ? entry.role.trim() : undefined,
        photo,
        bio: typeof entry.bio === 'string' ? entry.bio.trim() : undefined,
        tags: Array.isArray(entry.tags) ? entry.tags.map(String) : [],
        links,
        initials: initialsOf(name),
      };
    });

  return contributors;
}

export function getSupporters(): Supporter[] {
  const raw = readYaml<unknown>('supporters.yml');
  if (!Array.isArray(raw)) return [];

  return raw
    .filter((entry): entry is Record<string, unknown> => {
      if (!entry || typeof entry !== 'object') return false;
      if (!('name' in entry) || typeof entry.name !== 'string') {
        console.warn('[supporters.yml] intrare ignorata: lipseste `name`');
        return false;
      }
      return true;
    })
    .map((entry): Supporter => {
      const name = (entry.name as string).trim();

      const links = (['website', 'linkedin'] as const)
        .filter((key) => typeof entry[key] === 'string' && (entry[key] as string).trim())
        .map((key) => ({
          platform: key as SocialPlatform,
          url: toUrl(key, (entry[key] as string).trim()),
          label: PLATFORM_LABELS[key],
        }));

      // Acceptam si `photo:`, ca sa fie la fel ca in contributors.yml.
      const logo = resolveImage(
        entry.logo ?? entry.photo,
        LOGO_DIR,
        '/supporters',
        `[supporters.yml] ${name}`
      );

      return { name, logo, links, initials: initialsOf(name) };
    });
}
