import Component from '@glimmer/component';
import ShoppingCart from '../components/icons/shopping-cart';
import { inject as service } from '@ember/service';

export default class HeaderComponent extends Component {
  @service cartService;

  ShoppingCart = ShoppingCart;
}
