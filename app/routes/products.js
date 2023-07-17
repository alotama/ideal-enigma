import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ProductsRoute extends Route {
  @service store;

  async model() {
    return {
      products: this.store.findAll('product'),
      navbars: this.store.findAll('navbar')
    }
  }
}
