import { module, test } from 'qunit';
import { setupRenderingTest } from 'card-archive/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | card', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    this.setProperties({
      card: {
        id: 56196385,
        name: 'Tri-Brigade Kitt',
        type: 'Effect Monster',
        images: {
          id: 56196385,
          image_url:
            'https://storage.googleapis.com/ygoprodeck.com/pics/56196385.jpg',
          image_url_small:
            'https://storage.googleapis.com/ygoprodeck.com/pics_small/56196385.jpg',
        },
        location: 'unsorted',
      },
    });

    await render(hbs`<Card @card={{this.card}}/>`);

    assert.dom('div').hasClass('card');
    assert.dom('.card').isVisible();
    assert.dom('.card').hasText('X');
    assert.dom('.card').hasStyle({
      'background-image':
        'url("https://storage.googleapis.com/ygoprodeck.com/pics/56196385.jpg")',
    });

    // Template block usage:
    await render(hbs`
      <Card @card={{this.card}}>
        template block text
      </Card>
    `);

    assert.dom(this.element).doesNotIncludeText('template block text');
  });
});
