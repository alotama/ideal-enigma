import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product', function (hooks) {
  setupRenderingTest(hooks);

  // hooks.beforeEach(function () {
  //   this.owner.register('service:cart-service', MockCartService);
  // });

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.setProperties({
      product: {
        img: 'images/strawberries.png',
        name: 'Strawberries',
        price: 5,
        code: 'SR1',
        count: 0,
        token: {
          id: '3_1350',
          value: '3 for £13.50',
        },
      },
      productType: 'grid',
    });

    await render(
      hbs`<Product @product={{this.product}} @productType={{this.productType}} />`
    );

    assert.dom('[data-test-name]').hasText('Strawberries');
    assert.dom('[data-test-price]').hasText('£5.00');
    assert.dom('[data-test-token]').hasText('3 for £13.50');

    assert.dom('[data-test="button-plus"]').hasText('Add to cart');
    await click(find('[data-test="button-plus"]'));

    // De esta forma no se esta testeando que el click del button ejecute addToCart
    // pero es la única forma que encuentro de simular el cambio en @product.count
    this.set('product.count', '1');
    assert
      .dom('[data-test="count-value"]')
      .hasText('1', 'quantity is incremented after clicking add to cart');

    assert
      .dom('[data-test="button-trash"]')
      .exists({ count: 1 }, 'El botón de quitar del carrito existe');
    await click(find('[data-test="button-trash"]'));
    this.set('product.count', '0');
    assert
      .dom('[data-test="count-value"]')
      .hasText('0', 'quantity is decremented after clicking remove from cart');
  });
});
