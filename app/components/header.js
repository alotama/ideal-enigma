import Component from '@glimmer/component';
import ShoppingCart from '../components/icons/shopping-cart';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class HeaderComponent extends Component {
  @service cartService;

  ShoppingCart = ShoppingCart;

  @tracked unitsInCart;

  @tracked totalPayable;

  constructor() {
    super(...arguments);
    this.updateUnitsInCart();
    this.updateTotalPayable();
  }

  updateUnitsInCart() {
    this.unitsInCart = this.cartService.getUnitsInCart();
  }

  updateTotalPayable() {
    this.totalPayable = this.cartService.getTotalPayable();
  }
}
