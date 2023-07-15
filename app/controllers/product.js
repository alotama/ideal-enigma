import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default class ProductController extends Controller {
    @computed('model.priceInPounds')
    get priceInPounds() {
        return this.model.priceInPounds;
    }
}
