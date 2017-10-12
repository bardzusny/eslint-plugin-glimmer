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
        },
        fixable: null,
    },

    create: function(context) {
      const suspiciousAssignments = [];

      return {
        // this.xxx <=|+=|-=>
        'AssignmentExpression' (node) {
          let thisNode = node.left;
          while (thisNode && thisNode.type !== 'ThisExpression') {
            thisNode = thisNode.object;
          }
          if (thisNode && thisNode.type === 'ThisExpression') suspiciousAssignments.push(node);
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
                message: 'Side effect in tracking getter property'
              });
            });
          }
        }
      };
    }
};
