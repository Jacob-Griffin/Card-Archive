import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | result-list', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.set('results', {
      56196385: {
        id: '56196385',
        name: 'Tri-Brigade Kitt',
        images: { image_url_small: '' },
      },
    });

    await render(hbs`<ResultList @results={{this.results}} />`);

    assert.dom('ul').exists();
    assert.dom('li h5').hasText(this.results['56196385'].name);

    // Template block usage:
    await render(hbs`
      <ResultList @results={{this.results}}>
        template block text
      </ResultList>
    `);

    assert.dom(this.element).doesNotIncludeText('template block text');
  });
});
