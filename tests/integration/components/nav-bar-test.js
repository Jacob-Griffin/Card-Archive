import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | nav-bar', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<NavBar />`);

    assert.dom(this.element).hasText('Card Archive Cards Search');

    // Template block usage:
    await render(hbs`
      <NavBar>
        template block text
      </NavBar>
    `);

    assert.dom(this.element).doesNotIncludeText('template block text');
  });
});
