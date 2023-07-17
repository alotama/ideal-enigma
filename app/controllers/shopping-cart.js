import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ChevronLeft from '../components/icons/chevron-left';
import Trash from '../components/icons/trash';

export default class ShoppingCartController extends Controller {
  @service cartService;

  IconChevronLeft = ChevronLeft;
  IconTrash = Trash;

  @action
  emptyCart() {
      this.cartService.emptyCart()
  }
}
