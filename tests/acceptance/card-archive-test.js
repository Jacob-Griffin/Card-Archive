import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'card-archive/tests/helpers';

module('Acceptance | card archive', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('h1').hasText('Welcome to Card Archive');

    assert.dom('.link-stack .button[href="/add"]').hasText('Add Cards');
    assert.dom('.link-stack .button[href="/collections"]').hasText('My Collections');
    assert.dom('.link-stack .button[href="/search"]').hasText('Search Cards');

    await click('.link-stack .button[href*="add"]');

    assert.strictEqual(currentURL(), '/add');
  });
});
