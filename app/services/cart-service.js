import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CartServiceService extends Service {
  itemList = A([]);
  @tracked unitsInCart = 0;
  @tracked totalPayable = 0;

  getUnitsInCart() {
    return this.unitsInCart;
  }

  getTotalPayable() {
    return Math.max(0, this.totalPayable);
  }

  addToCart(item) {
    const existingProduct = this.itemList.find(
      (itemProduct) => itemProduct.code === item.code
    );
    if (existingProduct) {
      existingProduct.count++;
    } else {
      item.count = 1;
      this.itemList.pushObject(item);
    }
    this.unitsInCart++;
    const actualPrice = this.totalPayable + item.price;
    this.totalPayable = parseFloat(actualPrice.toFixed(2));
  }

  removeToCart(item) {
    item.count--
    if (item.count === 0) {
      this.itemList.removeObject(item)
    }
    this.unitsInCart--;
    const actualPrice = this.totalPayable - item.price;
    this.totalPayable = parseFloat(actualPrice.toFixed(2));
  }
}
