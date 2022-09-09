import Model, { attr } from '@ember-data/model';

export default class QueryCacheModel extends Model {
  @attr('string') key;
  @attr('string') query;
  @attr() result;
}
