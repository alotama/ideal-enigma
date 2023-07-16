import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CartServiceService extends Service {
  @tracked itemList = A([]);
  @tracked unitsInCart = 0;
  @tracked subtotal = 0;
  @tracked discount = 0;
  @tracked totalPayable = 0;
  @tracked SR_DISCOUNT = 0
  @tracked GR_DISCOUNT = 0
  @tracked CF_DISCOUNT = 0

  getUnitsInCart() {
    return this.unitsInCart;
  }

  getTotalPayable() {
    const totalFinal = this.subtotal - this.discount;
    this.totalPayable = totalFinal
    return Math.max(0, this.totalPayable);
  }

  addPromotion(item) {
    if(item.code === 'SR1') {
      if(item.count % 3 === 0) {
        const discountPrice = 4.5
        const totalDiscount = (item.count * item.price) - (item.count * discountPrice)
        this.SR_DISCOUNT = totalDiscount
      }
    }
    if(item.code === 'GR1') {
      if(item.count % 2 === 0) {
        const mountCharged = item.count / 2
        const mountPrice = item.price * mountCharged
        this.GR_DISCOUNT = mountPrice
      }
    }
    if(item.code === 'CF1') {
      if (item.count >= 3) {
        const originalPrice = item.price;
        const discountedPrice = originalPrice * (2 / 3);
        const totalDiscount = (item.count * originalPrice) - (item.count * discountedPrice);
        this.CF_DISCOUNT = totalDiscount;
      }
    }

    this.discount = this.SR_DISCOUNT + this.GR_DISCOUNT + this.CF_DISCOUNT
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
    this.addPromotion(item)
    this.subtotal = this.subtotal + item.price
    this.totalPayable = this.totalPayable + item.price
  }

  removeToCart(item) {
    item.count--
    if (item.count === 0) {
      this.itemList.removeObject(item)
    }
    this.unitsInCart--;
    const actualPrice = this.subtotal - item.price;
    this.subtotal = parseFloat(actualPrice.toFixed(2));
  }
}
