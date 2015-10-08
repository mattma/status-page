import Ember from "ember";
import config from "../../config/environment";

export default function(url, options){
  if (config.environment === "test") {
    url = url.replace(new RegExp('[^/]*(//)?[^/]*/'), '/');
  }

  url = `${config.apiUrl}/${config.api.current}${url} `;

  return new Ember.RSVP.Promise((resolve, reject) => {
    options.dataType = 'json';
    options.success = Ember.run.bind(null, resolve);
    options.error = Ember.run.bind(null, reject);
    options.crossDomain = true;
    options.contentType = 'application/json';
    options.data = JSON.stringify(options.data);
    Ember.$.ajax(url, options);
  });
}
