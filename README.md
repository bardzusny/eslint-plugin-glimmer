# eslint-plugin-glimmer

Eslint plugin for Glimmer.js apps

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-glimmer`:

```
$ npm install eslint-plugin-glimmer --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-glimmer` globally.

## Usage

Add `glimmer` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "glimmer"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "glimmer/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here





