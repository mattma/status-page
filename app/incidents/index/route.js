import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    let a = {
     "incidents":[
        {
           "id":1444160477120134180,
           "level":"critical",
           "message":"server fucked up",
           "time":1444160477120134180
        },
        {
           "id":1444160486831113253,
           "level":"critical",
           "message":"server has some issues",
           "time":1444160486831113253
        }
     ]
    };
    return a.incidents;
  }
});
