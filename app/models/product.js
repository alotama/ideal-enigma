import Model, { attr } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('string') price;
  @attr('string') code;
  @attr('string') token; // por qué funciona esto? solo se muestra en el FE cuando se llama badge, como en Mirage
  @attr('string') img;
  @attr('number') count;
  @attr('object') promotions;
}
