/**
 * @fileoverview Warns about unexpected side effects in getters marked with @tracked decorator
 * @author Adrian Zalewski
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-side-effects-in-tracking-getters"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("no-side-effects-in-tracking-getters", rule, {
    valid: [
        {
            code: `
              export default class MyName extends Component {
                numberPlusOne: number

                @tracked('args.number')
                increaseNumber() {
                  this.numberPlusOne = this.args.number + 1;
                }
              }
            `,
            parser: 'typescript-eslint-parser',
        },
        {
            code: `
              export default class MyName extends Component {
                @tracked('args.number')
                get numberPlusOne() {
                  return this.args.number + 1;
                }
              }
            `,
            parser: 'typescript-eslint-parser',
        },
        {
            code: `
              export default class MyName extends Component {
                @tracked('args.number')
                get numberPlusOne() {
                  globalNumberPlusOne = this.args.number + 1;
                  return globalNumberPlusOne;
                }
              }
            `,
            parser: 'typescript-eslint-parser',
        },

    ],
    invalid: [
        {
            code: `
              export default class MyName extends Component {
                numberPlusOneProperty: number

                @tracked('args.number')
                get numberPlusOne() {
                  this.numberPlusOneProperty = this.args.number + 1;
                  return this.numberPlusOneProperty;
                }
              }
            `,
            parser: 'typescript-eslint-parser',
            errors: [{
                message: "Side effect in tracked getter property detected.",
                line: 7,
            }]
        },
        {
            code: `
              export default class MyName extends Component {
                numberPlusOneProperty: number

                @tracked('args.number')
                get numberPlusOne() {
                  this.args.number += 1;
                  return this.args.number;
                }
              }
            `,
            parser: 'typescript-eslint-parser',
            errors: [{
                message: "Side effect in tracked getter property detected.",
                line: 7,
            }]
        },
        {
            code: `
              export default class MyName extends Component {
                numberPlusOneProperty: number

                @tracked('args.number')
                get numberPlusOne() {
                  this.args.number -= 1;
                  return this.args.number;
                }
              }
            `,
            parser: 'typescript-eslint-parser',
            errors: [{
                message: "Side effect in tracked getter property detected.",
                line: 7,
            }]
        }
    ]
});
