import { module, test } from 'qunit';
import { setupRenderingTest } from 'kshop-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | confirmation-modal', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('closeModal', () => {});
    this.set('removeItem', () => {});
    await render(hbs`<ConfirmationModal 
    @closeModal={{this.closeModal}}
    @removeItem={{this.removeItem}}
    />`);

    assert
      .dom(this.element)
      .hasText(
        'Confirm Removal Are you sure you want to remove this item from your cart? Keep It Remove Item'
      );
  });
});
