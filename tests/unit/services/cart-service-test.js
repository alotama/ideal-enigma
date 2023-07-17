import { module, test } from 'qunit';
import { setupTest } from 'kshop-app/tests/helpers';
import { set } from '@ember/object';

const ProductTest = {
  img: 'images/strawberries.png',
  name: 'Strawberries',
  price: 5,
  code: 'SR1',
  count: 0,
  token: {
    id: '3_1350',
    value: '3 for £13.50',
  },
}

module('Unit | Service | cartService', function (hooks) {
  setupTest(hooks);

  test('addToCart works', function(assert){
    let service = this.owner.lookup('service:cart-service');
    assert.equal(service.itemList.length, 0, 'item list is empty')

    service.addToCart(ProductTest)
    assert.equal(service.itemList.length, 1, 'item list size increse by 1')
    assert.equal(service.unitsInCart, 1, 'unitsInCart is correct')
    assert.equal(service.subtotal, 5, 'subtotal is correct')
    assert.equal(service.totalPayable, 5, 'totalPayable is correct')
  })

  test('removeToCart works', function(assert){
    let service = this.owner.lookup('service:cart-service');
    service.addToCart(ProductTest)

    assert.equal(service.itemList.length, 1, 'item list is not empty')
    assert.deepEqual(service.itemList[0], ProductTest, 'itemList contains the expected item')

    service.removeToCart(ProductTest)
    assert.equal(service.itemList.length, 0, 'item was removed from itemList')
    assert.equal(service.unitsInCart, 0, 'unitsInCart was decremented')
    assert.equal(service.subtotal, 0, 'subtotal was updated')
    assert.equal(service.totalPayable, 0, 'totalPayable was updated')
  })

  test('addPromotion works', function(assert){
    const service = this.owner.lookup('service:cart-service');

    const itemSR = { code: 'SR1', count: 3, price: 5 };
    const itemGR = { code: 'GR1', count: 4, price: 10 };
    const itemCF = { code: 'CF1', count: 5, price: 15 };

    service.itemList.push(itemSR, itemGR, itemCF);
    service.addPromotion();

    assert.equal(service.SR_DISCOUNT, 1.5, 'SR1 discount correctly');
    assert.equal(service.GR_DISCOUNT, 20, 'GR1 discount correctly');
    assert.equal(service.CF_DISCOUNT, 25, 'CF1 discount correctly');
    assert.equal(service.discount, 46.5, 'Total discount calculated correctly');
  })

  test('getUnitsInCart works', function (assert) {
    const service = this.owner.lookup('service:cart-service');
    service.unitsInCart = 5;

    const result = service.getUnitsInCart();

    assert.equal(result, 5, 'getUnitsInCart returns the correct value');
  });

  test('getTotalPayable works', function (assert) {
    const service = this.owner.lookup('service:cart-service');

    service.subtotal = 100;

    const itemCF = { code: 'CF1', count: 5, price: 15 };

    service.itemList.push(itemCF);

    service.getTotalPayable()
    assert.equal(service.discount, 25, 'discount to be 25');
    assert.equal(service.subtotal, 100, 'subtotal to be 100');
    assert.equal(service.totalPayable, 75, 'getTotalPayable returns the correct value');
  });
});
