import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';
import Time from 'incident/utils/time/constant';

export default Ember.Route.extend({
  beforeModel () {
    this.transitionTo('incidents.messages', 'current_week');
  }
});
