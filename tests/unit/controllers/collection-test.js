import { module, test } from 'qunit';
import { setupTest } from 'card-archive/tests/helpers';

module('Unit | Controller | collection', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:collection');
    assert.ok(controller);
  });
});
