import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Card />`);

    assert.dom('.card').isVisible();
    assert.dom('.card h3').exists();
    assert.dom('.card p').exists();

    // Template block usage:
    await render(hbs`
      <Card>
        template block text
      </Card>
    `);

    assert.dom(this.element).includesText('template block text');
  });
});
