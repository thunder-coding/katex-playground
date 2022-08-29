# Katex Playground

This project allows you to play with [Katex](https://katex.org/), whose aim is to provide a fast typesetting for the internet. It allows you to write math expressions, view a live view of the resultant Katex code, and export it as an image, so that it can be shared on the internet on platforms which do not support Latex/Katex/and the like.

This project originally started with the aim to fulfill my needs, but has been open sourced so that others can benefit from it as well.

## Development

### Pre-requisites

Make sure you have the following command-line tools available in your `$PATH`:

- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Getting started

Clone the Git repository:

```bash
git clone https://github.com/thunder-coding/katex-playground.git
gh repo clone thunder-coding/katex-playground       # Using GitHub CLI
```

### Install dependencies

```bash
yarn
```

### Run the app

```bash
yarn start
```

## Contributing

Contributions of all kinds are welcome. Please open an issue or pull request if you find any bugs or have any suggestions.

Note that I won't be accepting any PRs modifying `yarn.lock` or `package.json` files as they might pose a security risk. Changes to `package.json` may be accepted if they don't change the dependencies of the app. If modifications to `yarn.lock` are inevitable, they'll be merged manually, whereby I'll be completely regenerate the `yarn.lock` file.
