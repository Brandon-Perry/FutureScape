# FutureScape

Basic Overview:

Technologies used: -React -Flask -Postgres -Some graphing technology?

MVPS: Users should be able to create an event for users to make predictions on 
Users should be able to assign probabilities for each option to occur, and the Event should register and display this against other users 
Events should automatically lock at a certain time, where an admin can determine the outcome and automatically give/take the users points 
Users can comment comment on different events to discuss their thoughts. Users can search for events

Bonus MVPs
Flair for users

Back-end routes: /api/users/ <-- Get all users /api/users/:id <-- Get a user /api/users/ POST <-- Create a user /api/users/ PUT <-- Edit a user /api/users/:id DELETE <-- Delete a user /api/users/:id/events <-- Gets all events that a user has predicted on /api/users/:id/comments <-- Get all comments that a user has made

/api/events/:id <-- Get an event 
/api/events/ <-- Get all events 
/api/events/ POST <-- Create an event 
/api/events/ PUT <-- Edit an event 
/api/events/ DELETE <-- Delete an event

/api/events/:category <-- Get all events related to a category

/api/events/:id/predictions <-- Get all predictions on this event

/api/events/:id/comments <-- Get all comments about this event 
/api/events/:id/comments/:id <-- Get a single comment 
/api/events/:id/comments/ POST <-- Create comment 
/api/events/:id/comments/:id PUT <-- Edit comment 
/api/events/:id/comments/:id DELETE <-- Delete comment

/api/events/:id/resolve/:trueorfalse <-- Allows admin to resolve an event, rewarding users 
/api/events/:id/lock <-- Locks event from further predictions

Front-end Routes: 
/ <-- App home page (users can't perform actions like making a prediction until they are logged in, but can see the bets going on) 
/login <-- Login /signup <-- Signup /demo <-- tutorial walk-through

/events/:id <-- particular event, its predictions, and comments 
/events/category/:name <-- Events filtered by category name (preset) 
/users/:id <-- See a user's profile, their predictions, etc

/createEvent <-- Allows users to create a new event

/tutorial <-- Tutorial for all new users

Home page layout https://wireframe.cc/ubanUO

Event/:id page https://wireframe.cc/QX6QAa

User/:id page https://wireframe.cc/Wup9eX

Create event page https://wireframe.cc/nJHSDb


Components

Navbar <-- Present on every page. Contains logo, the user, and a searchbar
Footer <-- Contains footer stuff

Main application webpage
Homepage <-- Main page with all of the predictions going on. Can just filter the events by category when users click on categories
DisplayOptions <-- Contains display options and categories for the homepage that the user can change. Changes state that affects render of the events.
Events <-- Contains all the information for each event. Will populate the homepage for each event

Event page
EventsContainer <-- Container for the entire event page. Will contain and render subcomponents
Graph <-- Depicts the graph of prediction values
UserPredictions <-- Contains the X most recent predictions that have been made, listing the user and their prediction values. Should update as different users enter values
Comments <-- Should render comments and update as comments are made

User page
UserContainer <--Container for user information
StatsRankings <-- Displays the stats and rankings of the user in question
UserComments <-- Displays the comments that a user has made and which events this has been on

Event Creation page
EventCreationContainer <-- Container for event creation
EventCreationForm <-- Form for creating event