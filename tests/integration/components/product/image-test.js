import { module, test } from 'qunit';
import { setupRenderingTest } from 'kshop-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product-image', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('productType', 'row');
    this.set('src', 'product-image.jpg');
    this.set('alt', 'Product Image');
    this.set('token', 'Token Text');

    await render(hbs`
      <Product::Image
        @productType={{this.productType}}
        @src={{this.src}}
        @alt={{this.alt}}
        @token={{this.token}}
      />
    `);

    assert.dom('img').exists('La imagen del producto se renderiza correctamente');
    assert.dom('img').hasAttribute('src', 'product-image.jpg', 'El atributo src de la imagen es correcto');
    assert.dom('img').hasAttribute('alt', 'Product Image', 'El atributo alt de la imagen es correcto');

    assert.dom('[data-test-token]').exists('El token del producto se renderiza correctamente');
  });
});
