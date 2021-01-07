# from app.models import db, Choice

# def seed_choices():
#     Yes = Choice(description='Yes')
#     No = Choice(description='No')

#     db.session.add(Yes)
#     db.session.add(No)
#     db.session.commit()


# def undo_users():
#     db.session.execute('TRUNCATE choices;')
#     db.session.commit()