import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import ChevronDown from '../components/icons/chevron-down';
import ChevronRight from '../components/icons/chevron-right';

export default class SummaryComponent extends Component {
  @service cartService;
  @tracked isCollpsed = false;

  IconChevronDown = ChevronDown;
  IconChevronRight = ChevronRight;

  @action
  openCollapsable() {
    this.isCollpsed = !this.isCollpsed;
  }
}
