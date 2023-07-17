import { module, test } from 'qunit';
import { setupRenderingTest } from 'kshop-app/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product/button', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.set('count', 1);
    this.set('addToCart', () => this.set('count', this.count + 1));
    this.set('removeToCart', () => this.set('count', this.count - 1));

    await render(hbs`
      <Product::Button
        @count={{this.count}}
        @addToCart={{this.addToCart}}
        @removeToCart={{this.removeToCart}}
      />
    `);

    assert.dom('[data-test="count-value"]').hasText('1', 'El conteo inicial es correcto');

    await click('[data-test="button-plus"]');
    assert.dom('[data-test="count-value"]').hasText('2', 'El conteo se incrementa después de hacer clic en "Add to Cart"');

    await click('[data-test="button-trash"]');
    assert.dom('[data-test="count-value"]').hasText('1', 'El conteo se decrementa después de hacer clic en "Remove from Cart"');
  });
});
