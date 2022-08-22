import { module, test } from 'qunit';
import { click, visit, currentURL,fillIn, waitFor, triggerEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'card-archive/tests/helpers';
import { clearDatabase } from '../helpers/clearIndexedDB';

module('Acceptance | card archive', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');
    //await clearDatabase();

    //Home page should have header and two links
    assert.strictEqual(currentURL(), '/');
    assert.dom('.page-header').hasText('Welcome to Card Archive');

    assert.dom('.link-stack .button[href="/cards"]').hasText('Your Cards');
    assert.dom('.link-stack .button[href="/search"]').hasText('Search Cards');

    //Navigate to cards
    await click('.link-stack .button[href="/cards"]');

    assert.strictEqual(currentURL(), '/cards');

    //Add a new card
    await fillIn('#cardSearch','tri-brigade kitt');

    await waitFor('.ygopro-result h5',{timeout:3000});
    
    //check that the autofill for the card we searched is there, then click it
    assert.dom('.ygopro-result h5').hasText('Tri-Brigade Kitt');

    //click the result
    await triggerEvent('.ygopro-result h5','click');

    //check that the card exists
    assert.dom('.card:not(.form)').doesNotIncludeText('Add Cards');

  });
});
