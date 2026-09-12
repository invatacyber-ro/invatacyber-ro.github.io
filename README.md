# InvataCyber.ro

Site de prezentare temporar pentru comunitatea de securitate cibernetica
InvataCyber.ro. O singura pagina: intra pe Discord, urmareste-ne pe LinkedIn,
plus Contributors Wall.

Next.js 16 + Tailwind 4 + TypeScript, export static (`output: 'export'`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # HTML static in out/
```

## Contributors Wall

Se genereaza la build time din `content/contributors.yml`. Fara cod.

1. Pune poza in `public/contributors/` (patrata, min. 400x400px, sub 300 KB)
2. Adauga o intrare in `content/contributors.yml`
3. Commit + push (GitHub Actions face build si deploy)

```yaml
- name: Ana Popescu
  role: Penetration Tester
  photo: ana-popescu.jpg
  bio: Susține workshop-urile de web application security.
  tags:
    - Web AppSec
    - Burp Suite
  links:
    linkedin: https://www.linkedin.com/in/ana-popescu
    github: https://github.com/anapopescu
```

Doar `name` e obligatoriu. Ordinea de pe site = ordinea din fisier, iar toate
cardurile au aceeasi dimensiune indiferent cat de lung e `bio`.

**Platforme in `links`:** linkedin, github, x, discord, youtube, instagram,
tiktok, twitch, medium, substack, telegram, website, email, hackthebox,
tryhackme, credly. La `email` scrii doar adresa (fara `mailto:`). La `discord`
poti pune un URL sau doar username-ul, care se afiseaza ca text. Restul accepta
si doar domeniul, `https://` se adauga automat.

Build-ul nu cade pe greseli: poza inexistenta arata inițialele, platforma
necunoscuta se ignora, intrarea fara `name` se ignora. Toate scriu warning in
consola. Platforma noua se adauga in `SOCIAL_PLATFORMS` (`lib/content.ts`) plus
iconița in `components/SocialIcon.tsx`.

## Companii care ne sustin

Sectiunea de sub Contributors Wall, generata din `content/supporters.yml`.
Aceleasi casete ca la contribuitori:

```yaml
- name: CybrOps
  logo: cybrops_logo.jpg
  website: https://www.cybrops.io/
  linkedin: https://www.linkedin.com/company/cybrops/
```

Doar `name` e obligatoriu. `website` si `linkedin` accepta si doar domeniul,
`https://` se adauga automat.

**Logo:** pune fisierul in `public/supporters/` si scrie doar numele lui. Merge
si `logo:` si `photo:`, sunt acelasi lucru. Fara logo (sau cu un nume gresit) se
afiseaza inițialele numelui si apare un warning in consola.

Logo-ul umple o rama patrata de 64px, la fel ca pozele contribuitorilor. E
afisat cu `object-contain`, deci un logo patrat umple rama complet, iar unul lat
intra intreg, fara sa fie taiat. Cel mai bine arata un logo patrat. Fundalul
ramei e inchis la culoare, deci foloseste logo-uri deschise sau cu transparenta.

Daca stergi toate intrarile (chiar daca lasi comentariile), sectiunea dispare
de pe site si build-ul trece normal.

## Restul textelor

`content/site.yml` are numele, tagline-ul, descrierea si link-urile. Textele din
pagina stau in `components/` (`Nav`, `Hero`, `Contributors`, `ContributorCard`,
`Supporters`, `SupporterCard`, `Footer`).

## Branding

Culorile din `app/globals.css` (blocul `@theme`) vin din
`../branding/logo_brand_doc.md`: brand blue `#5B9FEE` / `#4681DD` / `#3360B7`,
navy `#0A1421`, off-white `#F7F8FA`. Logo-urile sunt in `public/img/`.

## Deploy

GitHub Pages, prin `.github/workflows/deploy.yml`, la fiecare push pe `main`.
Domeniul e setat prin `public/CNAME`. Pentru Vercel / Netlify / Cloudflare
Pages: build `npm run build`, output `out`.
