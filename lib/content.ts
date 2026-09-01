import fs from 'node:fs';
import path from 'node:path';
import { load as parseYaml } from 'js-yaml';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const PHOTO_DIR = path.join(process.cwd(), 'public', 'contributors');

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

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  links: { discord: string; linkedin: string; email?: string };
};

function readYaml<T>(file: string): T {
  const full = path.join(CONTENT_DIR, file);
  try {
    return parseYaml(fs.readFileSync(full, 'utf8')) as T;
  } catch (err) {
    throw new Error(
      `Nu am putut citi/parsa content/${file}: ${(err as Error).message}`
    );
  }
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

      // Verificam la build time ca poza exista, ca sa nu ajunga 404 in producție.
      let photo: string | undefined;
      const rawPhoto = typeof entry.photo === 'string' ? entry.photo.trim() : '';
      if (rawPhoto) {
        const file = rawPhoto.replace(/^\/?(public\/)?contributors\//, '');
        if (fs.existsSync(path.join(PHOTO_DIR, file))) {
          photo = `/contributors/${file}`;
        } else {
          console.warn(
            `[contributors.yml] ${name}: poza "${file}" nu exista in public/contributors/, folosesc inițialele`
          );
        }
      }

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
