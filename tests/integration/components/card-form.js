import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card-form-mini', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<CardFormMini />`);

    assert.dom(this.element).includesText('+');

    assert.dom('#cardSearch').hasValue('Search Cards');

    // Template block usage:
    await render(hbs`
      <CardForm>
        template block text
      </CardForm>
    `);

    assert.dom(this.element).doesNotIncludeText('template block text');
  });
});
