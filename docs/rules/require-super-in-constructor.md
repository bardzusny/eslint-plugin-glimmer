# Enforces super calls in component constructors (require-super-in-constructor)

When overriding the constructor of Glimmer.js components it is necessary to include a `super()` call.

## Rule Details

Examples of **incorrect** code for this rule:

```js
export default class SomeComponent extends Component {
  constructor() {
    this.count = 0;
  }
}
```

Examples of **correct** code for this rule:

```js
export default class SomeComponent extends Component {
  constructor() {
    super(...arguments);
    this.count = 0;
  }
}
```
