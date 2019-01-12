from mongoengine import Document, IntField, StringField
import pendulum
import logging
import nameparser

ACCOUNT_TYPE = {
    'AWS': 1
}


class User(Document):

    external_account_type = IntField(required=True)
    external_account_id = StringField(required=True)
    profile_name = StringField()
    email_address = StringField(required=True, unique=True)
    access_token = StringField()
    refresh_token = StringField()
    token_expires_epoch = IntField()

    def get_id(self):
        return str(self.email_address)

    @property
    def is_authenticated(self):
        now = pendulum.now().int_timestamp
        logging.debug("now=%d, token expires at=%d", now, self.token_expires_epoch)
        if self.token_expires_epoch and (self.token_expires_epoch > now):
            return True
        return False

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def pretty_name(self):
        return nameparser.HumanName(self.profile_name).first

