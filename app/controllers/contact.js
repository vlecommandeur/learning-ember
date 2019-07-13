import Controller from '@ember/controller';
import { observer } from '@ember/object';
import { match, not, empty, lt, or } from '@ember/object/computed';

export default Controller.extend({

    headerMessage: 'Contact page',

    isValid: match('emailAddress', /^.+@.+\..+$/),
    isNotValid: not('isValid'),
    isEmpty: empty('message'),
    isTooShort: lt('message.length', 5),
    isDisabled: or('isNotValid', 'isEmpty', 'isTooShort'),

    init() {
        this.set('emailAddressClass', 'form-group has-error has-feedback');
        this.set('emailAddressSpanClass', 'glyphicon glyphicon-remove form-control-feedback');
        this.set('emailAddressSpanContent', '(error)');

        this.set('messageClass', 'form-group has-error has-feedback');
        this.set('messageSpanClass', 'glyphicon glyphicon-remove form-control-feedback');
        this.set('messageSpanContent', '(error)');
    },

    emailAddressChanged: observer('emailAddress', function () {
        if (this.isValid) {
            this.set('emailAddressClass', 'form-group has-success has-feedback');
            this.set('emailAddressSpanClass', 'glyphicon glyphicon-ok form-control-feedback');
            this.set('emailAddressSpanContent', '(success)');
        }
        else {
            this.set('emailAddressClass', 'form-group has-error has-feedback');
            this.set('emailAddressSpanClass', 'glyphicon glyphicon-remove form-control-feedback');
            this.set('emailAddressSpanContent', '(error)');
        }
    }),

    messageChanged: observer('message', function () {
        if (!this.isTooShort) {
            this.set('messageClass', 'form-group has-success has-feedback');
            this.set('messageSpanClass', 'glyphicon glyphicon-ok form-control-feedback');
            this.set('messageSpanContent', '(success)');
        }
        else {
            this.set('messageClass', 'form-group has-error has-feedback');
            this.set('messageSpanClass', 'glyphicon glyphicon-remove form-control-feedback');
            this.set('messageSpanContent', '(error)');
        }
    }),

    actions: {
        saveContact() {
            alert(`Saving of the following contact is in progress: ${this.get('emailAddress')}, ${this.get('message')}`);
            this.set('responseMessage', `We got your message and we’ll get in touch soon`);
            this.set('emailAddress', '');
            this.set('message', '');
        }
    }

});
