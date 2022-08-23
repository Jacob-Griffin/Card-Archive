import { module, test } from 'qunit';
import {
  click,
  visit,
  currentURL,
  fillIn,
  waitFor,
  triggerEvent,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'card-archive/tests/helpers';
import { clearDatabase, addDummyCard } from '../helpers/clearIndexedDB';

module('Acceptance | card archive', function (hooks) {
  setupApplicationTest(hooks);
  test('visiting /', async function (assert) {
    await visit('/');
    await clearDatabase();

    //Home page should have header and two links
    assert.strictEqual(currentURL(), '/');
    assert.dom('.page-header').hasText('Welcome to Card Archive');

    assert.dom('.link-stack .button[href="/cards"]').hasText('Your Cards');
    assert.dom('.link-stack .button[href="/search"]').hasText('Search Cards');

    //Navigate to cards
    await click('.link-stack .button[href="/cards"]');

    assert.strictEqual(currentURL(), '/cards');
  });
  test('visiting /cards', async function (assert) {
    await visit('/cards');

    assert.dom('div.card.form').exists();
  });
  test('adding a card', async function (assert) {
    await visit('/cards');

    await fillIn('#cardSearch', 'tri-brigade kitt');

    await waitFor('.ygopro-result h5', { timeout: 3000 });

    //check that the autofill for the card we searched is there, then click it
    assert.dom('.ygopro-result h5').hasText('Tri-Brigade Kitt');

    //click the result
    await triggerEvent('.ygopro-result h5', 'click');

    //check that the card exists
    assert.dom('.card:not(.form)').doesNotIncludeText('Add Cards');
  });
  test('adding a collection', async function (assert) {
    await visit('/cards');

    await fillIn('#collectionInput', 'Test Collection');
    await click('#addCollectionButton');

    await waitFor('.collection-link:not(.form)');

    assert.dom('.collection-link:not(.form)').includesText('Test Collection');
    assert
      .dom('.collection-link a[href$="collection/test_collection"]')
      .exists();

    //Check that the page for the collection we just created exists
    await visit('/collection/test_collection');

    assert.dom('.card.form').exists();
  });
  test('check default collection pages', async function (assert) {
    //check the unsorted collection page for the add card (working collection)
    await visit('/collection/unsorted');

    assert.dom('.card.form').exists();

    //Check that other collections don't exist;
    await visit('/collection/fake_collection');

    assert.dom('.card.form').doesNotExist();
    assert
      .dom(this.element)
      .includesText('Collection "Fake Collection" not found');
  });
  test('visit /search', async function(assert){
    await addDummyCard();

    await visit('/search');

    assert.dom('.card').doesNotExist();

    await fillIn('#search-bar','tri-');

    await waitFor('.card',3000);
    assert.dom('.card').includesText('In: Unsorted');

    await fillIn('#search-bar','oops');

    await waitFor('#no-results',3000);
    assert.dom('#no-results').hasText('No cards found matching \"oops\"');
  });
});
