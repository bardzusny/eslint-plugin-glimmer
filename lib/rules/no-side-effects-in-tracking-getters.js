/**
 * @fileoverview Warns about unexpected side effects in getters marked with @tracked decorator
 * @author Adrian Zalewski
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "Warns about unexpected side effects in getters marked with @tracked decorator",
            category: "Fill me in",
            recommended: false
        },
        fixable: null,  // or "code" or "whitespace"
        schema: [
            // fill in your schema
        ]
    },

    create: function(context) {

        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

      const suspiciousAssignments = [];

      return Object.assign({},
        {
          // this.xxx <=|+=|-=>
          'AssignmentExpression' (node) {
            if (
              node.left.type === 'MemberExpression' &&
              node.left.object.type === 'ThisExpression'
            ) {
              suspiciousAssignments.push(node);
            }
          },
          'MethodDefinition:exit' (node) {
            if (node.kind === 'get' &&
              (node.decorators || []).some((decoratorNode => decoratorNode.expression.callee.name === 'tracked'))) {
              const startLine = node.loc.start.line;
              const endLine = node.loc.end.line;

              suspiciousAssignments.filter((assignment) => {
                return assignment.loc.start.line > startLine && assignment.loc.end.line < endLine;
              }).forEach((badAssignment) => {
                context.report({
                  node: badAssignment,
                  message: 'Side effect in tracked getter property detected.'
                });
              });
            }
          },
        }
      );
    }
};

function examineMethodNode(report, node) {

}
