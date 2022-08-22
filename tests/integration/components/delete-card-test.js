import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | delete-card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<DeleteCard />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <DeleteCard>
        template block text
      </DeleteCard>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
