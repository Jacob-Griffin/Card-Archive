import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | collection-box', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CollectionBox />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <CollectionBox>
        template block text
      </CollectionBox>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
