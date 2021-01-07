from flask.cli import AppGroup
from .user import seed_users, undo_users
from .category import seed_categories, undo_categories
from .event import seed_events, undo_events


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command


@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_events()
    # Add other seed functions here

# Creates the `flask seed undo` command


@seed_commands.command('undo')
def undo():
    undo_events()
    undo_categories()
    undo_users()
    
    # Add other undo functions here