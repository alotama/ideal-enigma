import Component from '@glimmer/component';
import ShoppingCart from '../components/icons/shopping-cart';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default class HeaderComponent extends Component {
  @service cartService;

  ShoppingCart = ShoppingCart;

  @computed('cartService.unitsInCart')
  get unitsInCart() {
    return this.cartService.getUnitsInCart();
  }

  @computed('cartService.totalPayable')
  get totalPayable() {
    return this.cartService.getTotalPayable();
  }
}
