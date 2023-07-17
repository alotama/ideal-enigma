import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductsRoute extends Route {
  @service store;

  async model() {
    return {
      products: await this.store.findAll('product'),
      navbars: await this.store.findAll('navbar'),
    };
  }
}
