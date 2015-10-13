import Ember from 'ember';
import ajax from 'incident/utils/ajax/ajax';
import Time from 'incident/utils/time/constant';

export default Ember.Route.extend({
  beforeModel () {
    this.transitionTo('incidents.messages', 'since=16703&until=16718');
  }
});
