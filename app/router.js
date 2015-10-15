import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('incidents', {}, function() {
    this.route('messages', {path: '/:range'});
  });

  this.route('status', {}, function() {
    this.route('dashboard', {path: '/:range'});
  });
});

export default Router;
