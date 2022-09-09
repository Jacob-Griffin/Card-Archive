import { module, test } from 'qunit';
import { setupTest } from 'card-archive/tests/helpers';

module('Unit | Model | query cache', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let store = this.owner.lookup('service:store');
    let model = store.createRecord('query-cache', {});
    assert.ok(model);
  });
});
