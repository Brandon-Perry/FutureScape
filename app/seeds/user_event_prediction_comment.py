from app.models import db, Event, User, Comment, Prediction
import datetime

def seed_users_events_predictions_comments():


    ####GENERATE USERS

    demo_user = User(username='Demo', email='demo@demo.com', password='password', points=100)


    ####GENERATE EVENTS

    event1 = Event(title='Will this seed work?', description='Upon flask seed all, will this appear in my database?',
            expires=datetime.datetime.now(), category_id=1)


    ####GENERATE PREDICTIONS

    prediction1 = Prediction(user_id=1, event_id=1, choice='Yes', probability=50)
    prediction2 = Prediction(user_id=1, event_id=2, choice='No', probability=50)


    #GENERATE COMMENTS
    comment1 = Comment(user_id=1, event_id=1, comment="Jee I'm not quite that sure")


    db.session.add(demo_user)
    db.session.add(event1)
    db.session.commit()

    demo_user.append(prediction1)
    demo_user.append(prediction2)

    