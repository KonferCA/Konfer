<div align="center">
<img src="./src/assets/brand/footerIcon.svg" />
                                               
![GitHub](https://img.shields.io/github/license/KonferCA/Konfer.ca?style=flat-square)

#### The official landing page for Konfer - see [here](https://konfer.ca).

</div>


## Quick Setup :hammer:

> Install Node.js
```sh
https://nodejs.org/en/download/
```

> Install pnpm using npm
```sh
$ npm install -g pnpm
```

> Clone the repo
```sh
$ git clone https://github.com/KonferCA/Konfer.ca.git
```

> From your terminal, navigate to the root path of clone
```sh
$ cd path/to/your/clone
```

> Install dependencies
```sh
$ pnpm i
```

> Run local server
```sh
$ pnpm dev
```

## Releases :rocket:

Releases are managed with [release-please](https://github.com/googleapis/release-please).

1. Merge changes into `main` using [Conventional Commit](https://www.conventionalcommits.org/) messages (for example `feat: add speaker page` or `fix: correct mobile nav`).
2. release-please opens a release PR on `main` with the version bump and updated `CHANGELOG.md`.
3. Merge the release PR. release-please tags the release, then CI merges `main` into `live` and deploys to Firebase Hosting.
