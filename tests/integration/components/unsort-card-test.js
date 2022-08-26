import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | unsort-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<UnsortCard />`);

    assert.dom(this.element).hasText('Move to Unsorted');
    assert.dom('a').exists();
    assert.dom('calcite-icon').exists();

    // Template block usage:
    await render(hbs`
      <UnsortCard>
        template block text
      </UnsortCard>
    `);

    assert.dom(this.element).doesNotIncludeText('template block text');
  });
});
