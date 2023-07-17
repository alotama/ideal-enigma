import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ChevronLeft from '../components/icons/chevron-left';

export default class ShoppingCartController extends Controller {
  @service cartService;

  IconChevronLeft = ChevronLeft;
}
