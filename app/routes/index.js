import Route from '@ember/routing/route';

export default Route.extend({

    model() {
        return this.store.createRecord('invitation');

        //this.store.createRecord('invitation', { email });
    },

    actions: {

        saveInvitation(newInvitation) {
            newInvitation.save().then(() => this.controller.set('responseMessage', true));
        },

        willTransition() {
            // rollbackAttributes() removes the record from the store
            // if the model 'isNew'
            this.controller.get('model').rollbackAttributes();
            this.controller.set('responseMessage', false);
        }
    }
});