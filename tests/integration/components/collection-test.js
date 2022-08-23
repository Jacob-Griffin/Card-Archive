import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | collection', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Collection @search={{false}}/>`);

    assert.dom('div.card.form.add').exists();

    await render(hbs`<Collection @search={{true}}/>`);

    assert.dom('div.card.form.add').doesNotExist();

    // Template block usage:
    await render(hbs`
      <Collection>
        template block text
      </Collection>
    `);

    assert.dom(this.element).doesNotIncludeText('template block text');
  });
});
