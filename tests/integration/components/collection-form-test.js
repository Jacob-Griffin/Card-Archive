import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | collection-form', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CollectionForm />`);

    assert.dom(this.element).includesText('Add Collection');
    assert.dom('calcite-icon[icon="folder-plus"').exists();
    assert.dom('input#collection-input').exists();

    // Template block usage:
    await render(hbs`
      <CollectionForm>
        template block text
      </CollectionForm>
    `);

    assert.dom(this.element).doesNotIncludeText('template block text');
  });
});
