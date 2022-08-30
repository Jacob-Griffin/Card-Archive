import { module, test } from 'qunit';
import { setupTest } from 'card-archive/tests/helpers';

module('Unit | Route | manage', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:manage');
    assert.ok(route);
  });
});
