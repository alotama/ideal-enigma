import { module, test } from 'qunit';
import { setupRenderingTest } from 'kshop-app/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.setProperties({
      product: {
        img: 'images/strawberries.png',
        name: 'Strawberries',
        price: 5,
        code: 'SR1',
        count: 1,
        token: {
          id: '3_1350',
          value: '3 for £13.50',
        },
        addToCart: () => this.set('product.count', this.product.count + 1),
        removeToCart: () => this.set('product.count', this.product.count - 1),
      },
      productType: 'row',
    });

    await render(hbs`
      <Product
      @product={{this.product}} @productType={{this.productType}}
      />
    `);

    assert
      .dom('[data-test-name]')
      .hasText(
        'Strawberries',
        'El nombre del producto se renderiza correctamente'
      );

    assert
      .dom('[data-test-price]')
      .hasText('£5.00', 'El precio del producto se renderiza correctamente');

    assert
      .dom('[data-test-token]')
      .exists('El token del producto se renderiza correctamente');

    await click('[data-test="button-plus"]');
    this.set('product.count', 2);
    assert
      .dom('[data-test="count-value"]')
      .hasText(
        '2',
        'El conteo se incrementa después de hacer clic en "Add to Cart"'
      );

    await click('[data-test="button-trash"]');
    this.set('product.count', 1);
    assert
      .dom('[data-test="count-value"]')
      .hasText(
        '2',
        'El conteo se decrementa después de hacer clic en "Remove from Cart"'
      );
  });
});
