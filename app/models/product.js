import Model, { attr } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('string') price;
  @attr('string') code;
  @attr('string') token;
  @attr('string') img;
  @attr('number') count;
  @attr('object') promotions;
}
