import { module, test } from 'qunit';
import { setupRenderingTest } from 'kshop-app/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | summary', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    const service = this.owner.lookup('service:cart-service');

    service.subtotal = 100
    service.discount = 20
    service.totalPayable = 80

    await render(hbs`<Summary />`);

    assert.dom('[data-test="subtotal"]').hasText('£100.00', 'shows subtotal amount');
    assert.dom('[data-test="discount"]').hasText('£20.00', 'shows discount amount');
    assert.dom('[data-test="total-payable"]').hasText('£80.00', 'shows total payable amount');
  });

  test('it should click on open-collapsable button', async function (assert) {
    const service = this.owner.lookup('service:cart-service');

    service.subtotal = 100
    service.discount = 20
    service.totalPayable = 80
    service.itemList = [
      {
        name: 'Strawberries',
        count: 2,
        price: 20
      },
      {
        name: 'Coffe',
        count: 5,
        price: 60
      },
    ]

    await render(hbs`<Summary />`);

    await click('[data-test="open-collapsable"]');
    assert.dom('[data-test="item-count-name"]').hasText('2x Strawberries', 'Found product name')
    assert.dom('[data-test="item-price"]').hasText('£40.00', 'Found product price')
  });
});
