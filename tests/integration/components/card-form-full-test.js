import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card-form-full', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CardFormFull />`);

    assert.dom(this.element).hasText('Main \"Add Card\" component');

    // Template block usage:
    await render(hbs`
      <CardFormFull>
        template block text
      </CardFormFull>
    `);

    assert.dom(this.element).includesText('template block text');
  });
});
