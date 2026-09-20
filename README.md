<div align="center">

<img src="public/images/portfolio-hero.png" alt="Abstract cloud and data artwork" width="240" />

# Parvathirajan Natarajan

### Manager · Engineer · Developer

A cinematic, responsive portfolio about cloud platforms, data products,
engineering leadership, and the work behind them.

[![Live portfolio](https://img.shields.io/badge/Live_Portfolio-0071E3?style=for-the-badge&logo=safari&logoColor=white)](https://parvathirajan.github.io)
[![CI & Deploy](https://img.shields.io/github/actions/workflow/status/parvathirajan/parvathirajan.github.io/node.js.yml?branch=main&style=for-the-badge&label=Build%20%26%20Deploy)](https://github.com/parvathirajan/parvathirajan.github.io/actions/workflows/node.js.yml)
[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)

</div>

## The experience

The site combines large editorial typography, interactive project stories,
light and dark themes, a responsive animated hero, career history, skills, and
**His Vault**—a folder-driven archive for links and downloadable files.

## Run locally

Use Node.js 22.22.2 or newer and Yarn 1.

```sh
yarn install --frozen-lockfile
yarn start
```

The browser opens automatically at **http://localhost:3000**. The development
server uses a strict port so another process cannot silently move it elsewhere.

## His Vault

Add one folder per blog topic inside [`data/`](data/README.md). The folder name
is displayed as the topic title.

```text
data/
└── Cloud Architecture/
    ├── architecture-notes.pdf
    ├── reference-diagram.png
    └── links.txt
```

- Every regular file becomes a download.
- Every `.txt` file is treated as a newline-separated URL list.
- Multiple links, text files, downloads, nested files, and topic folders are
  supported.
- New content is discovered automatically by Vite during development and each
  production build.
- The vault unlock code is `00444`.

> **Privacy note:** the passcode provides a polished interface lock. GitHub
> Pages and this repository are public, so committed files are publicly
> accessible and must not contain secrets or private information. True access
> control requires a server-side authenticated storage service.

## Content map

| Content                                | Location                 |
| -------------------------------------- | ------------------------ |
| Career, projects, skills, social links | `src/components/Data.ts` |
| Vault topics, files, and link lists    | `data/<topic>/`          |
| Main layout and interactions           | `src/App.jsx`            |
| Visual system and responsive design    | `src/App.scss`           |
| Hero artwork and static assets         | `public/images/`         |

## Quality checks

```sh
yarn audit
yarn typecheck
yarn test
yarn build
yarn preview
```

Pushes to `main` run the dependency audit, TypeScript checks, interaction tests,
and production build before deploying `build/` to GitHub Pages.

## Stack

React 18 · Vite 8 · TypeScript · Sass · Vitest · Testing Library · GitHub Pages

---

<div align="center">
Built by <a href="https://github.com/parvathirajan">Parvathirajan Natarajan</a>.
</div>
