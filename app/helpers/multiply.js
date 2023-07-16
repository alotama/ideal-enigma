import { helper } from '@ember/component/helper';

export default helper(function multiply(params) {
   const [operand1, operand2] = params;
   return operand1 * operand2;
});
