import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class NavbarComponent extends Component {
  @tracked activeItem = 'groceries';

  changeActiveItem(item) {
    this.activeItem = item;
  }
}
