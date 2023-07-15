import Model, { attr } from '@ember-data/model';
import { computed } from '@ember/object';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('string') price;
  @attr('string') code;
  @attr('string') badge; // por qué funciona esto? solo se muestra en el FE cuando se llama badge, como en Mirage
  @attr('string') img;

  @computed('price')
  get priceInPounds() {
    let pounds = Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    })

    return pounds.format(this.price);
  }
}
