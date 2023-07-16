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
    this.addPromotion()
    const totalFinal = this.subtotal - this.discount;
    this.totalPayable = totalFinal
    return Math.max(0, this.totalPayable);
  }

  addPromotion() {
    const itemSR = this.itemList.find(
      (itemProduct) => itemProduct.code === 'SR1'
    );
    if(itemSR) {
      if(itemSR.count % 3 === 0) {
        const discountPrice = 4.5
        const totalDiscount = (itemSR.count * itemSR.price) - (itemSR.count * discountPrice)
        this.SR_DISCOUNT = totalDiscount
      }
    }
    const itemGR = this.itemList.find(
      (itemProduct) => itemProduct.code === 'GR1'
    );
    if(itemGR) {
      if(itemGR.count % 2 === 0) {
        const mountCharged = itemGR.count / 2
        const mountPrice = itemGR.price * mountCharged
        this.GR_DISCOUNT = mountPrice
      }
    }
    const itemCF = this.itemList.find(
      (itemProduct) => itemProduct.code === 'CF1'
    );
    if(itemCF) {
      if (itemCF.count >= 3) {
        const originalPrice = itemCF.price;
        const discountedPrice = originalPrice * (2 / 3);
        const totalDiscount = (itemCF.count * originalPrice) - (itemCF.count * discountedPrice);
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
    this.subtotal = this.subtotal + item.price
    this.totalPayable = this.totalPayable + item.price
  }

  removeToCart(item) {
    item.count--
    if (item.count === 0) {
      this.itemList.removeObject(item)
    }
    this.unitsInCart--;
    this.subtotal = this.subtotal - item.price
    this.totalPayable = this.totalPayable - item.price
  }
}
