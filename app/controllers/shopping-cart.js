import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import ChevronLeft from '../components/icons/chevron-left';
import { tracked } from '@glimmer/tracking';
import Trash from '../components/icons/trash';

export default class ShoppingCartController extends Controller {
  @service cartService;
  @tracked isOpenModal = {
    status: false,
    target: '',
  };

  IconChevronLeft = ChevronLeft;
  IconTrash = Trash;

  @action
  emptyCart() {
    this.cartService.emptyCart();
  }

  @action
  closeModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  @action
  removeItem() {
    const item = this.isOpenModal.target;
    if (item.count === 0) {
      this.cartService.itemList.removeObject(item);
      this.cartService.addPromotion(item);
      this.cartService.getTotalPayable();
      this.isOpenModal = {
        status: !this.isOpenModal.status,
        target: item,
      };
    }
  }

  @action
  openModal(event) {
    const productCard = event.currentTarget.closest(
      '[data-test="productCard"]'
    );
    const productCode = productCard.attributes['data-code'].nodeValue;
    const item = this.cartService.itemList.find(
      (itemProduct) => itemProduct.code === productCode
    );
    item.count--;
    this.cartService.unitsInCart--;
    this.cartService.subtotal = this.cartService.subtotal - item.price;
    this.cartService.addPromotion(item);
    this.cartService.getTotalPayable();
    if (item.count === 0) {
      this.isOpenModal = {
        status: !this.isOpenModal.status,
        target: item,
      };
    }
  }
}
