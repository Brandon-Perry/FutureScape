from app.models import db, Event, User, Comment, Prediction, Category, Choice
import datetime
import random
from faker import Faker

def seed_all():

        fake = Faker()


        

        ####GENERATE USERS

        dev = User(username='Dev', email='dev@dev.com', password='password123456', admin=True)
        demo_user = User(username='Demo', email='demo@demo.com', password='password')
        seedy = User(username='Seedy McData', email='seedy@demo.com', password='password')
        db.session.add(dev)
        db.session.add(demo_user)
        db.session.add(seedy)
        extra_users_list = [demo_user, seedy]
        for _i in list(range(0,10)):
                fake_profile = fake.simple_profile()
                new_user = User(username=fake_profile['username'], email=fake.email(), password='password')
                db.session.add(new_user)
                extra_users_list.append(new_user)

        db.session.commit()

        ####GENERATE CHOICES
        Yes = Choice(name='Yes')
        No = Choice(name='No')

        db.session.add(Yes)
        db.session.add(No)
                
        db.session.commit()

        ####GENERATE CATEGORIES
        All = Category(name='All')
        SciTech = Category(name='Science & Technology')
        Politics = Category(name='Politics')
        Geopolitics = Category(name='Geopolitics')
        Environment = Category(name='Environment')
        Industry = Category(name='Industry')
        Finance = Category(name='Finance')
        Other = Category(name='Other')
        db.session.add(All)
        db.session.add(SciTech)
        db.session.add(Politics)
        db.session.add(Geopolitics)
        db.session.add(Environment)
        db.session.add(Industry)
        db.session.add(Finance)
        db.session.add(Other)

        db.session.commit()

        ####GENERATE EVENTS

        
        event1 = Event(title='Will Donald Trump be Tried and Convicted by the Senate by April?', description='Will the United States Senate successfully convict former President Donald J. Trump of the Capitol Riots impeachment charges brought before the House of Representatives by April 1st at midnight Eastern Standard Time? Event resolves either when the Senate convicts Trump, if the Senate acquits Trump, or by the aforementioned date',
                expires=datetime.datetime(2021, 4, 1, 0, 0, 0), category_id=3, created_at=datetime.datetime(2021, 1, 7, 0, 0, 0))
        event2 = Event(title='Will the Price of Bitcoin exceed $50,000 USD on February 1st?', description='As of February 1st UTC, will the market price of Bitcoin (as reported by CoinBase) exceed $50,000 USD? The event ends on February 1st UTC and will not resolve prior to then, even if Bitcoin prices go above $50,000.',
                expires=datetime.datetime(2021, 2, 1, 0, 0, 0), category_id=7, created_at=datetime.datetime(2021, 1, 5, 0, 0, 0))
        event3 = Event(title='Will Tesla Announce a New Car Model by End of Year?', description='By end of year UTC, will Tesla make an announcement regarding a new car model? This does not include new versions of previous models such as the Model Y or Roadster. This event ends either when a new model is announced, or on January 1st 2022 UTC',
                expires=datetime.datetime(2022, 1, 1, 0, 0, 0), category_id=6, created_at=datetime.datetime(2021, 1, 7, 0, 0, 0))
        event4 = Event(title='Will the Biden Administration rejoin the Paris Agreement by End of its First Month in Power?', description='By February 18th, will the United States rejoin the Paris Agreement? Event ends either when the United States has rejoined, or at February 18th.',
                expires=datetime.datetime(2021, 2, 18, 0, 0, 0), category_id=5, created_at=datetime.datetime(2021, 1, 17, 0, 0, 0))
        event5 = Event(title='Will There Be a Conflict Between the United States and China in the South China Sea That Results in At Least One Death by End of Year?', description='The South China Sea is a contested space between the United States and China, with China claiming it as its own territory, and the United States engaging in freedom of navigation excersizes. Conflict is defined either as in fighting or some form of violence. This event ends either when one death has occured because of conflict between the two nations, or on January 1st, 2022 UTC',
                expires=datetime.datetime(2022, 1, 1, 0, 0, 0), category_id=4, created_at=datetime.datetime(2021, 1, 18, 0, 0, 0))
        event6 = Event(title='Will This Event Resolve as True?', description='This is a demo event', expires=datetime.datetime(2021, 1, 15, 15, 0, 0), category_id=8, demo_event=True)
        event7 = Event(title="Will Deepmind's AlphaFold achieve at least a 90 GDT on the 14th CASP Assessment?", description="Casp is an organization that's dedicated to tracking improvements on the protein folding grand challenge. During its upcoming 14th assessment, will DeepMind's AlphaFold achieve at least a 90 on its median GDT score?",
                expires=datetime.datetime(2020,11,30,0,0,0), category_id=2, created_at=datetime.datetime(2020, 1, 1, 0, 0, 0))

        db.session.add(event1)
        db.session.add(event2)
        db.session.add(event3)
        db.session.add(event4)
        db.session.add(event5)
        db.session.add(event6)
        db.session.add(event7)

        db.session.commit()

        event_list = [event1, event2, event3, event4, event5, event6, event7]


    ####GENERATE PREDICTIONS AND COMMENTS

        predictions_list = []
        

        for _i in list(range(0,30)):
                random_user = random.choice(extra_users_list)
                random_event = random.choice(event_list)
                probYes = random.randint(1,99)
                probNo = 100 - probYes
                yesPrediction = Prediction(user_id=random_user.id, event_id=random_event.id, choice_id=1, probability=probYes)
                noPrediction = Prediction(user_id=random_user.id, event_id=random_event.id, choice_id=2, probability=probNo)
                comment = Comment(user_id=random_user.id, event_id=random_event.id, comment=fake.paragraph(nb_sentences=2))
                
                db.session.add(yesPrediction)
                db.session.add(noPrediction)
                db.session.add(comment)
                db.session.commit()

                random_user.events.append(yesPrediction)
                random_user.events.append(noPrediction)
                random_user.comments.append(comment)
                random_event.predictions.append(yesPrediction)
                random_event.predictions.append(noPrediction)

                predictions_list.append(yesPrediction)
                predictions_list.append(noPrediction)


        
        

        db.session.commit()





def undo_seed_all():

        db.session.execute('TRUNCATE users, events, choices, categories, predictions, comments restart identity;')
        db.session.commit()