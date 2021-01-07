from app.models import db, Event
import datetime

def seed_events():
    event1 = Event(title='Will this seed work?', description='Upon flask seed all, will this appear in my database?',
                expires=datetime.datetime.now(), category_id=1)
    db.session.add(event1)
    db.session.commit()


def undo_events():
    db.session.execute('TRUNCATE events;')
    db.session.commit()