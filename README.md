![CI](https://github.com/parvathirajan/parvathirajan.github.io/actions/workflows/node.js.yml/badge.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Netlify Status](https://api.netlify.com/api/v1/badges/8f44589e-4dca-40ef-9e1e-29fac5f9de47/deploy-status)](https://app.netlify.com/sites/parvathirajan/deploys)

<h3 align="center"><a href="https://parvathirajan.github.io">https://parvathirajan.github.io</a><h3>
<h3 align="center"><a href="https://thisisraaajan.netlify.app">https://thisisraaajan.netlify.app</a><h3>

Local development (Node.js 22.22.2+ and Yarn 1):

```sh
yarn install --frozen-lockfile
yarn start
```

Validation and production build:

```sh
yarn audit
yarn typecheck
yarn test
yarn build
yarn preview
```

Vite builds the site into `build/`. Vitest runs the interaction tests. The root
`index.html` is the entry page; static images and metadata remain in `public/`.
Career details are maintained in `src/components/Data.ts`.

Pushes to `main` deploy through GitHub Actions after the audit, type checks,
tests, and production build pass. Yarn's lockfile is the dependency source of
truth; use `yarn install --frozen-lockfile` for reproducible installs.
