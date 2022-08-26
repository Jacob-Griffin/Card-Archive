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
    assert.dom('main h1').hasText('Welcome to Card Archive');

    assert.dom('nav > a[href="/cards"]').hasText('Your Cards');
    assert.dom('nav > a[href="/search"]').hasText('Search Cards');

    //Navigate to cards
    await click('nav a.ember-view[href="/cards"]');

    assert.strictEqual(currentURL(), '/cards');
  });
  test('visiting /cards', async function (assert) {
    await visit('/cards');

    assert.dom('#collection-input').exists();
    assert.dom('#card-search').exists();
    assert.dom('article').doesNotExist();
  });
  test('adding a card', async function (assert) {
    await visit('/cards');

    await fillIn('#card-search', 'tri-brigade kitt');

    await waitFor('[id="56196385"]', { timeout: 3000 });

    //check that the autofill for the card we searched is there, then click it
    assert.dom('[id="56196385"] h5').hasText('Tri-Brigade Kitt');

    //click the result
    await triggerEvent('[id="56196385"] h5', 'click');

    //check that the card exists
    assert.dom('article').doesNotIncludeText('Add Cards');
  });
  test('adding a collection', async function (assert) {
    await visit('/cards');

    await fillIn('#collection-input', 'Test Collection');
    await click('button:not(.close-button)');

    await waitFor('a[href^="collection/"');

    assert.dom('a[href^="collection/"').includesText('Test Collection');
    assert
      .dom('a[href^="collection/test_collection"')
      .exists();

    //Check that the page for the collection we just created exists
    await visit('/collection/test_collection');

    assert.dom('article').exists();
  });
  test('check default collection pages', async function (assert) {
    //check the unsorted collection page for the add card (working collection)
    await visit('/collection/unsorted');

    assert.dom('#card-search').exists();

    //Check that other collections don't exist;
    await visit('/collection/fake_collection');

    assert.dom('.card.form').doesNotExist();
    assert
      .dom(this.element)
      .includesText('Collection "Fake Collection" not found');
  });
  test('visit /search', async function (assert) {
    await addDummyCard();

    await visit('/search');

    assert.dom('article').doesNotExist();

    await fillIn('#search-bar', 'tri-');

    await waitFor('article', 3000);
    assert.dom('article h3').includesText('In: Unsorted');

    await fillIn('#search-bar', 'oops');

    await waitFor('p.italic', 3000);
    assert.dom('p.italic').hasText('No cards found matching "oops"');
  });
});
