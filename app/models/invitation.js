import DS from 'ember-data';
import { match, not } from '@ember/object/computed';

export default DS.Model.extend({
  email: DS.attr('string'),
  isValid: match('email', /^.+@.+\..+$/),
  isDisabled: not('isValid')
});