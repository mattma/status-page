import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('incidents', {}, function() {
    this.route('index', {path: '/:range'});
  });
});

export default Router;
