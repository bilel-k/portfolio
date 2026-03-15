<div align="center">

<img src="public/profile.png" alt="Bilel Kaoulala" width="110" />

# Bilel Kaoulala — Portfolio

**Cybersécurité · DevSecOps · Développement Web**

[![Live](https://img.shields.io/badge/🌐_Live-bilelka.com-000000?style=for-the-badge)](https://bilelka.com)
[![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deploy](https://img.shields.io/github/actions/workflow/status/bilel-k/portfolio/deploy.yml?branch=main&style=for-the-badge&label=Deploy&logo=githubactions&logoColor=white)](https://github.com/bilel-k/portfolio/actions)

</div>

---

## ✨ Aperçu

Portfolio personnel full-stack construit avec **Next.js 16**, **TypeScript** et **Tailwind CSS v4**. Design sombre minimaliste, animations GPU-accélérées avec Framer Motion, interface bilingue FR/EN, déploiement automatique sur GitHub Pages via CI/CD.

<div align="center">

| Section | Description |
|---------|-------------|
| 🏠 **Hero** | Animation de rôles + terminal hacker interactif + stats |
| 👤 **À propos** | Bio, cloud de compétences interactif, viewer CV |
| 🗂️ **Projets** | 4 projets avec images, stack technique & liens GitHub |
| 💼 **Parcours** | Expériences professionnelles & formations |
| 🎓 **Certifications** | 4 certifications avec viewer PDF intégré |
| 🎯 **Objectifs** | Roadmap Court / Moyen / Long terme |
| 📬 **Contact** | Formulaire EmailJS + radar de mobilité interactif |

</div>

---

## 🛠️ Stack technique

<div align="center">

### Framework & Langage
![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=000)
![TypeScript](https://img.shields.io/badge/TypeScript_5-3178C6?style=flat-square&logo=typescript&logoColor=white)

### UI & Animation
![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=flat-square)

### Services & Déploiement
![EmailJS](https://img.shields.io/badge/EmailJS-FF6B35?style=flat-square&logo=gmail&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white)

</div>

---

## 📁 Structure du projet

```
portfolio/
├── public/
│   ├── profile.png              # Photo de profil
│   ├── projet-iot.png           # Illustration projet IoT
│   ├── certificats/             # PDFs & images certifications
│   └── CNAME                    # Domaine custom → bilelka.com
│
├── src/
│   ├── app/
│   │   ├── page.tsx             # Hero + assemblage des sections
│   │   ├── a-propos/            # Bio, compétences, CV
│   │   ├── projets/             # Grille de projets
│   │   ├── parcours/            # Expériences & formations
│   │   ├── certifications/      # Viewer PDF intégré
│   │   ├── objectifs/           # Roadmap par horizon
│   │   └── contact/             # Formulaire + radar mobilité
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Navigation sticky + menu mobile
│   │   │   └── Footer.tsx       # Footer avec stack & réseaux
│   │   └── ui/
│   │       ├── hacker-terminal.tsx   # Terminal CLI animé
│   │       ├── scramble-text.tsx     # Effet scramble sur titres
│   │       ├── section-reveal.tsx    # Reveal au scroll
│   │       ├── spotlight-card.tsx    # Carte avec compositing GPU
│   │       ├── scroll-ui.tsx         # Progress bar + back-to-top
│   │       └── text-marquee.tsx      # Marquee de technologies
│   │
│   └── lib/
│       ├── translations.ts      # i18n FR / EN complet
│       └── utils.ts
│
└── .github/workflows/
    └── deploy.yml               # CI/CD → GitHub Pages
```

---

## 🚀 Démarrage rapide

### Prérequis

- **Node.js** ≥ 20
- **npm** ≥ 10

### Installation & dev

```bash
# Cloner le repo
git clone https://github.com/bilel-k/portfolio.git
cd portfolio

# Installer les dépendances
npm install

# Démarrer le serveur de développement (Turbopack)
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Commandes

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement avec Turbopack |
| `npm run build` | Build de production (export statique → `./out`) |
| `npm run lint` | Linting ESLint |

---

## 🗂️ Projets

| # | Projet | Stack | Repo |
|---|--------|-------|------|
| 🛡️ | **Infra de Sécurité** | OPNsense · Wazuh · Nessus · OpenVPN · Fail2Ban | [audit-sec](https://github.com/bilel-k/audit-sec) |
| 🖥️ | **Virtualisation Proxmox** | Proxmox · HA · Infrastructure | [proxmox](https://github.com/bilel-k/proxmox) |
| 📡 | **Plateforme IoT de Monitoring** | Docker · MQTT · InfluxDB · Grafana · Node-RED · OPA | [industritech](https://github.com/bilel-k/industritech) |
| 🛒 | **Plateforme E-commerce** | React · TypeScript · Express.js · SQLite · Stripe | [fitcorner](https://github.com/bilel-k/fitcorner) |

---

## 🎓 Certifications

| Certification | Émetteur | Date |
|---------------|----------|------|
| DevOps Foundations: DevSecOps | LinkedIn Learning | Mar. 2026 |
| Fortinet Certified Fundamentals in Cybersecurity | Fortinet | Fév. 2026 |
| Hacker Éthique | Cisco Networking Academy | Fév. 2026 |
| Introduction à la Cybersécurité | Cisco Networking Academy | Fév. 2026 |

---

## 🌍 Internationalisation

Entièrement bilingue **Français / English** via un système de traductions centralisé dans `src/lib/translations.ts`. Aucune dépendance externe — le choix de langue est persisté dans le `localStorage`.

---

## ⚙️ CI/CD — Déploiement automatique

```
push → main
  └── Build Next.js (export statique)
       └── Upload artifact (./out)
            └── Deploy → GitHub Pages (bilelka.com)
```

Le pipeline est défini dans [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## 📬 Contact

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/bilel-kaoulala)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/bilel-k)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:bilel@mail.com)
[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://bilelka.com)

</div>

---

<div align="center">
  <sub>Built with ❤️ by <strong>Bilel Kaoulala</strong> — Next.js & Tailwind CSS</sub>
</div>
