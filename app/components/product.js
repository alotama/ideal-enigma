import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import Trash from '../components/icons/trash';
import Plus from '../components/icons/plus';
import Minus from '../components/icons/minus';

export default class ProductComponent extends Component {
  @tracked quantity = 0;
  @tracked emptyCart = true

  @action
  statusCart() {
    if(this.quantity > 0) {
      return this.emptyCart = false
    }

    this.emptyCart = true
  }

  @action
  addToCart() {
    this.quantity++;
    this.statusCart()
  }

  @action
  removeToCart() {
    this.quantity--
    this.statusCart()
  }

  IconTrash = Trash;
  IconPlus = Plus;
  IconMinus = Minus;
}
