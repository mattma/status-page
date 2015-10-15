import Ember from 'ember';

/**
 * Change text into a different format by passing the formatter
 * @params 0: the text that pass into the function
 * @params 1: what output you want the text to be
 * @params 2: Only used in split function, it is the split separator to be used
 * @return String
 *
 * ex: {{changeCase "hello-world" "class"}}
 */
export function changeCase(params/*, hash*/) {
  let string;

  switch (params[1]) {
    case 'lower':
      string = params[0].toLowerCase();
      break;
    case 'upper':
      string = params[0].toUpperCase();
      break;
    case 'camel':
      string = Ember.String.camelize(params[0]);
      break;
    case 'cap':
      string = Ember.String.capitalize(params[0]);
      break;
    case 'class':
      string = Ember.String.classify(params[0]);
      break;
    case 'dash':
      string = Ember.String.dasherize(params[0]);
      break;
    case 'decamel':
      string = Ember.String.decamelize(params[0]);
      break;
    case 'split':
      string = Ember.String.capitalize(params[0].split(params[2]).join(' '));
      break;
    default:
      string = params[0].toLowerCase();
  }

  return string;
}

export default Ember.Helper.helper(changeCase);
