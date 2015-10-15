import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel () {
    this.transitionTo('status.dashboard', 'pass_day');
  }
});
