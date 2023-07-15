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
    let pounds = Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    });

    return pounds.format(this.cartService.getTotalPayable());
  }
}
