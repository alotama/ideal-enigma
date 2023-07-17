import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProductComponent extends Component {
  @service cartService;
  
  @tracked productType;
  @tracked quantity = 0;

  @action
  addToCart() {
    const item = this.args.product;
    this.quantity++;
    this.cartService.addToCart(item);
  }

  @action
  removeToCart() {
    if (this.args.product.count > 0) {
      const item = this.args.product;
      this.quantity--;
      this.cartService.removeToCart(item);
    }
  }
}
