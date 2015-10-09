import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('incidents', function() {
    this.route('index', {path: '/:range'});
  });

  this.route('status', {path: '/status/:range'}, function() {});
});

export default Router;
