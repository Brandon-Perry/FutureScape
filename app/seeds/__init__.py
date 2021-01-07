from flask.cli import AppGroup
from .user import seed_users, undo_users
from .category import seed_categories, undo_categories
from .event import seed_events, undo_events
from .choice import seed_choices, undo_choices
from .seed_all import seed_all, undo_seed_all


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    # seed_users()
    # seed_categories()
    # seed_choices()
    # seed_events()
    # Add other seed functions here
    seed_all()

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    # undo_events()
    # undo_choices()
    # undo_categories()
    # undo_users()
    undo_seed_all()
    
    # Add other undo functions here