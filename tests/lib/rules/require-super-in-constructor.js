/**
 * @fileoverview Enforces super calls in init hooks
 * @author Adrian Zalewski
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/require-super-in-constructor"),

    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("require-super-in-constructor", rule, {
    valid: [
        {
            code: `
              export default class SomeComponent extends Component {
                constructor() {
                  super();
                  this.count = 0;
                }
              }
            `,
            parser: 'typescript-eslint-parser',
        },
    ],
    invalid: [
        {
            code: `
              export default class SomeComponent extends Component {
                constructor() {
                  this.count = 0;
                }
              }
            `,
            parser: 'typescript-eslint-parser',
            errors: [{
                message: "Call super() in component constructor",
            }]
        }
    ]
});
