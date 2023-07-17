import Model, { attr } from '@ember-data/model';

export default class NavbarModel extends Model {
    @attr('string') item_id;
    @attr('string') value;
}
