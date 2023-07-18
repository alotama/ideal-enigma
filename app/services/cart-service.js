import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class CartServiceService extends Service {
  @tracked itemList = A([]);
  @tracked unitsInCart = 0;
  @tracked subtotal = 0;
  @tracked discount = 0;
  @tracked totalPayable = 0;
  @tracked SR_DISCOUNT = {
    discount: 0,
    total: 0
  }
  @tracked GR_DISCOUNT = 0;
  @tracked CF_DISCOUNT = {
    discount: 0,
    total: 0
  };

  getUnitsInCart() {
    return this.unitsInCart;
  }

  getTotalPayable() {
    const discountTotal = Number(this.SR_DISCOUNT.discount) / 2 + Number(this.GR_DISCOUNT) + Number(this.CF_DISCOUNT.discount)
    this.discount = discountTotal;
    this.totalPayable = this.SR_DISCOUNT.total + this.GR_DISCOUNT + this.CF_DISCOUNT.total
    return Math.max(0, this.totalPayable);
  }

  addPromotion(item) {
    switch (item.code) {
      case 'SR1':
        const discountedSR1 = 4.5;
        const remainder = item.count % 3;
        const discountedQuantity = item.count - remainder; 
        this.SR_DISCOUNT.total = (discountedQuantity / 3) * (3 * discountedSR1) + (remainder * item.price); 
        this.SR_DISCOUNT.discount = discountedQuantity;
      break;
      case 'GR1':
      const setOfTwo = Math.floor(item.count / 2);
      const quantity = item.count % 2
      const mountPrice = (setOfTwo * item.price) + (quantity * item.price)
      this.GR_DISCOUNT = mountPrice;
      break;
      case 'CF1':
        const discountThreshold = 3; // Umbral para aplicar el descuento
        const discountPercentage = 2 / 3; // Precio con descuento
        let totalPrice = item.count * item.price; // Precio total sin descuento
        let totalDiscount = 0; // Descuento total
    
        if (item.count >= discountThreshold) {
          // Aplicar el descuento si la cantidad es mayor o igual al umbral
          const discountAmount = totalPrice * (1 - discountPercentage);
          totalPrice -= discountAmount;
          totalDiscount = discountAmount;
        }
        this.CF_DISCOUNT.discount = totalDiscount;
        this.CF_DISCOUNT.total = totalPrice;
      break;
      default:
        break;
    }
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
    this.subtotal = this.subtotal + item.price;
    this.addPromotion(item);
    this.getTotalPayable();
  }

  // TO-DO: No hace bien la resta. No tiene en cuenta la condición de los descuentos
  removeToCart(item) {
    item.count--;
    if (item.count === 0) {
      this.itemList.removeObject(item);
    }
    this.unitsInCart--;
    this.subtotal = this.subtotal - item.price;
    this.addPromotion(item);
    this.getTotalPayable();
  }

  emptyCart() {
    this.itemList.forEach(item => item.count = 0)
    this.itemList.clear();
    this.unitsInCart = 0;
    this.subtotal = 0;
    this.discount = 0;
    this.totalPayable = 0;
  }
}
