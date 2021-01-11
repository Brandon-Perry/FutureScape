from app.models import db, Event, User, Comment, Prediction, Category, Choice
import datetime

def seed_all():




        #GENERATE COMMENTS
        comment1 = Comment(user_id=1, event_id=1, comment="Jee I'm not quite that sure")

        ####GENERATE USERS

        demo_user = User(username='Demo', email='demo@demo.com', password='password', points=100)


        ####GENERATE CHOICES
        Yes = Choice(name='Yes')
        No = Choice(name='No')

        ####GENERATE PREDICTIONS

        prediction1 = Prediction(user_id=1, event_id=1, choice_id=1, probability=10)
        prediction2 = Prediction(user_id=1, event_id=2, choice_id=2, probability=90)

        ####GENERATE CATEGORIES
        SciTech = Category(name='Science & Technology')

        ####GENERATE EVENTS

        event1 = Event(title='Will this seed work?', description='Upon flask seed all, will this appear in my database?',
                expires=datetime.datetime.now(), category_id=1)






        db.session.add(demo_user)
        db.session.add(SciTech)
        db.session.add(event1)
        db.session.add(comment1)
        db.session.add(Yes)
        db.session.add(No)

        demo_user.events.append(prediction1)
        demo_user.events.append(prediction2)
        demo_user.comments.append(comment1)
        event1.predictions.append(prediction1)
        event1.predictions.append(prediction2)
        event1.comments.append(comment1)
        

        db.session.commit()





def undo_seed_all():

        db.session.execute('TRUNCATE users, events, choices, categories, predictions, comments restart identity;')
        db.session.commit()