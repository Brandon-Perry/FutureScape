from app.models import db, Category

def seed_categories():
    scienceTechnology = Category(name='Science & Technology')
    db.session.add(scienceTechnology)
    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories;')
    db.session.commit()