import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | collection-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CollectionList />`);

    assert.dom('div#your-collections').exists();
    assert.dom('div.form').hasText("+ Add Collection");

    // Template block usage:
    await render(hbs`
      <CollectionList>
        template block text
      </CollectionList>
    `);

    assert.dom(this.element).hasText("+ Add Collection");
  });
});
