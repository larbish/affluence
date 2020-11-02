# Contact info

Baptiste Leproux

Mail: leproux.baptiste@gmail.com

# Coding style

Typescript is used in a restrictive way thanks to TSLint.

All complexe objects are defined in src/models, I do not authorize 'any' type and all variables, response, params must be typed

In project context:

- I create a common project containing only data models
- I publish it on a repository manager in order to share it with all other projects (fronts and apis)

## Linter

I am still using TSlint even if i know it has been decrecated.


## Code formatter

Prettier (.prettierrc) | Use Prettier plugin on vscode

## IDE recommended settings for vscode

```
{
  "window.zoomLevel": 0,
  "editor.foldingStrategy": "indentation",
  "editor.insertSpaces": false,
  "editor.detectIndentation": false,
  "editor.tabSize": 4,
  "breadcrumbs.enabled": true,
  "terminal.integrated.rendererType": "dom",
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "editor.formatOnSave": true
}

```

## Git hooks

Use Husky for commit format, pre-commit and others commit lifecycles (.huskyrc.json)

# Styles

# How to use this project

## Using docker => Build and run your app with Compose

Run `docker-compose build` to build your app.

Run `docker-compose up` to run your app.

Docker compose will automatically set a mondodb database.

## Running unit tests

No tests currently - I worked with avajs and nock to handle integration and unitary tests.
