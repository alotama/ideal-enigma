import { helper } from '@ember/component/helper';

export default helper(function numberToPounds(price) {
  let pounds = Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
  });

  return pounds.format(price);
});
