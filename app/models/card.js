import Model, { attr, belongsTo } from '@ember-data/model';

export default class CardModel extends Model {
  @belongsTo('collection') collection;
  @attr card_id;
  @attr card_name;
  @attr card_type;
  @attr card_images;
}
