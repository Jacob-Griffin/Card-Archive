import EmberRouter from '@ember/routing/router';
import config from 'card-archive/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('collection', { path: '/collection/:collection_id' });
  this.route('cards');
  this.route('search');
});
