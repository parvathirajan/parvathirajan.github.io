![CI](https://github.com/parvathirajan/parvathirajan.github.io/actions/workflows/node.js.yml/badge.svg) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![Netlify Status](https://api.netlify.com/api/v1/badges/8f44589e-4dca-40ef-9e1e-29fac5f9de47/deploy-status)](https://app.netlify.com/sites/parvathirajan/deploys)

<h3 align="center"><a href="https://parvathirajan.github.io">https://parvathirajan.github.io</a><h3>
<h3 align="center"><a href="https://thisisraaajan.netlify.app">https://thisisraaajan.netlify.app</a><h3>

Local development (Node.js 22 and Yarn 1):

```sh
yarn install --frozen-lockfile
yarn start
```

Validation and production build:

```sh
yarn typecheck
yarn test --watchAll=false --runInBand --watchman=false
yarn build
```

Career details are maintained in `src/components/Data.ts`. The production site
is built into `build/`; pushes to `main` deploy through GitHub Actions after checks pass.

The Yarn `sass-loader` resolution upgrades Create React App's transitive loader
from v12 to v16 so it uses Dart Sass's modern JavaScript API. Use Yarn when
installing dependencies so this override is applied. The loader requires
Node.js 18.12 or newer; this project uses Node.js 22 in CI.
