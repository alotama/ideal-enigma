import { module, test } from 'qunit';

import { setupTest } from 'kshop-app/tests/helpers';

module('Unit | Model | navbar', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('navbar', {});
    assert.ok(model);
  });
});
