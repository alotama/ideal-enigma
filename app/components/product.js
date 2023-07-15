import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Trash from '../components/icons/trash';
import Plus from '../components/icons/plus';
import Minus from '../components/icons/minus';
import { inject as service } from '@ember/service';

export default class ProductComponent extends Component {
  @service cartService;

  @tracked quantity = 0;
  @tracked emptyCart = true;

  @action
  statusCart() {
    if (this.quantity > 0) {
      this.emptyCart = false;
    } else {
      this.emptyCart = true;
    }
  }

  @action
  addToCart() {
    const price = this.args.product.price;
    this.quantity++;
    this.cartService.plusTotalPayable(price);
    this.statusCart();
  }

  @action
  removeToCart() {
    if (this.quantity > 0) {
      const price = this.args.product.price;
      this.quantity--;
      this.cartService.decreceTotalPayable(price);
      this.statusCart();
    }
  }

  IconTrash = Trash;
  IconPlus = Plus;
  IconMinus = Minus;
}
