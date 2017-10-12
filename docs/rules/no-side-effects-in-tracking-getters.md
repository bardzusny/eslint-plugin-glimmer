# No side effects in getters tracking properties (no-side-effects-in-tracking-getters)

Getter methods tracking properties in Glimmer.js components are analogous to computed properties in Ember.js. Side effects emitted from computed properties are generally undesired and regarded as bad practice.

## Rule Details

This rule aims to prevent side effects originating from *de-facto* computed properties methods. Currently, it verifies that no assignments / mutations are applied to `this` object or its properties.

Examples of **incorrect** code for this rule:

```js
export default class MyName extends Component {
  numberPlusOneProperty: number

  @tracked('args.number')
  get numberPlusOne() {
    this.numberPlusOneProperty = this.args.number + 1;
    return this.numberPlusOneProperty;
  }
}
```

Examples of **correct** code for this rule:

```js
export default class MyName extends Component {
  @tracked('args.number')
  get numberPlusOne() {
    return this.args.number + 1;
  }
}
```
