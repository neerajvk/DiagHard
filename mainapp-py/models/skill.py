from mongoengine import Document, IntField, StringField, ReferenceField
from models.user import User


class Skill(Document):

    user = ReferenceField(User)
    name = StringField()
    created_on = IntField()
    last_updated = IntField()
    skill_json = StringField()
    meta = {
        'indexes': [
            { 'fields': ('user', 'name'), 'unique': True }
        ]
    }
