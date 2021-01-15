from app.models import db, Event, User, Comment, Prediction, Category, Choice
import datetime

def seed_all():




        #GENERATE COMMENTS
        comment1 = Comment(user_id=1, event_id=1, comment="Jee I'm not quite that sure")

        ####GENERATE USERS

        demo_user = User(username='Demo', email='demo@demo.com', password='password', points=100)
        seedy = User(username='Seedy McData', email='seedy@demo.com', password='password', points=100)
        delphi = User(username='Delphi', email='delphi@demo.com', password='password', points=100)


        ####GENERATE CHOICES
        Yes = Choice(name='Yes')
        No = Choice(name='No')
        bitcoin1 = Choice(name='Greater than $40,000')
        bitcoin2 = Choice(name='Between $20,000 and $40,000')
        bitcoin3 = Choice(name='Less than $20,000')


        ####GENERATE PREDICTIONS

        prediction1 = Prediction(user_id=1, event_id=1, choice_id=1, probability=10)
        prediction2 = Prediction(user_id=1, event_id=1, choice_id=2, probability=90)
        prediction3 = Prediction(user_id=2, event_id=1, choice_id=1, probability=30)
        prediction4 = Prediction(user_id=2, event_id=1, choice_id=2, probability=70)
        prediction5 = Prediction(user_id=1, event_id=2, choice_id=3, probability=20)
        prediction6 = Prediction(user_id=1, event_id=2, choice_id=4, probability=60)
        prediction7 = Prediction(user_id=1, event_id=2, choice_id=5, probability=20)
        

        ####GENERATE CATEGORIES
        All = Category(name='All')
        SciTech = Category(name='Science & Technology')
        Politics = Category(name='Politics')
        Geopolitics = Category(name='Geopolitics')
        Environment = Category(name='Environment')
        Industry = Category(name='Industry')
        Finance = Category(name='Finance')
        Other = Category(name='Other')

        ####GENERATE EVENTS

        
        event1 = Event(title='Will Donald Trump be Tried and Convicted by the Senate?', description='some description',
                expires=datetime.datetime.now(), category_id=3)
        event2 = Event(title='What Will the Price of Bitcoin be on February 1st?', description='Price of Bitcoin',
                expires=datetime.datetime.now(), category_id=7)






        db.session.add(demo_user)
        db.session.add(seedy)
        db.session.add(delphi)
        
        db.session.add(All)
        db.session.add(SciTech)
        db.session.add(Politics)
        db.session.add(Geopolitics)
        db.session.add(Environment)
        db.session.add(Industry)
        db.session.add(Finance)
        db.session.add(Other)

        db.session.add(event1)
        db.session.add(event2)

        db.session.add(comment1)

        db.session.add(Yes)
        db.session.add(No)
        db.session.add(bitcoin1)
        db.session.add(bitcoin2)
        db.session.add(bitcoin3)

        demo_user.events.append(prediction1)
        demo_user.events.append(prediction2)
        seedy.events.append(prediction3)
        seedy.events.append(prediction4)
        demo_user.events.append(prediction5)
        demo_user.events.append(prediction6)
        demo_user.events.append(prediction6)


        demo_user.comments.append(comment1)

        event1.predictions.append(prediction1)
        event1.predictions.append(prediction2)
        event1.predictions.append(prediction3)
        event1.predictions.append(prediction4)
        event2.predictions.append(prediction5)
        event2.predictions.append(prediction6)
        event2.predictions.append(prediction7)


        event1.comments.append(comment1)
        

        db.session.commit()





def undo_seed_all():

        db.session.execute('TRUNCATE users, events, choices, categories, predictions, comments restart identity;')
        db.session.commit()