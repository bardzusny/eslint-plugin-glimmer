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
        "glimmer/no-side-effects-in-tracking-getters": 2
    }
}
```

## Supported Rules

* [`no-side-effects-in-tracking-getters`](docs/rules/no-side-effects-in-tracking-getters.md)

## Contribution guide

In order to add a new rule, you should:
- Create issue on GH with description of proposed rule
- Generate a new rule using the [official yeoman generator](https://github.com/eslint/generator-eslint)
- Write test scenarios & implement logic
- Describe the rule in the generated `docs` file
- Make sure all tests are passing
- Create PR and link created issue in description

If you have any suggestions, ideas or problems feel free to add new [issue](https://github.com/bardzusny/eslint-plugin-glimmer/issues), but first please make sure your question does not repeat previous ones.
