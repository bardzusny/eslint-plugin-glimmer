/**
 * @fileoverview Enforces super calls in init hooks
 * @author Adrian Zalewski
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Enforces super calls in component constructor",
        },
        fixable: null,
    },

    create: function(context) {
        const superCalls = [];

        return {
          'CallExpression' (node) {
            if (node.callee.type === 'Super') superCalls.push(node);
          },
          'MethodDefinition:exit' (node) {
            if (node.kind !== 'constructor') return;

            const startLine = node.loc.start.line;
            const endLine = node.loc.end.line;

            if (!superCalls.some((superCall) => {
              return superCall.loc.start.line > startLine && superCall.loc.end.line < endLine;
            })) {
                context.report({
                  node,
                  message: 'Call super() in component constructor'
                });
            }
          }
        };
    }
};
