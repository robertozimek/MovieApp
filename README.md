## OMDB FAVORITES MOVIE APP

It was my first time writing an app in Sinatra/Ruby. I used react on the frontend, originally was going to just write it in vanilla js but figured the state management and reuse of components would be helpful on this project. Uses webpack and babel to transpile it into a bundle. Wrote it as a singe-page application.

Database is created on the fly.
Gemfile is included.

Setup:
```
bundle install
export OMDB_API_KEY=XXXXXXX
```

To run locally (localhost:3000):
```
bundle exec rackup -p 3000
```

## Things I would do differently if this was going to be released to production
- Typically I would have written some unit tests, but since it was my first time writing an app in Sinatra and Ruby I hadn't had the chance to learn a unit testing framework for Sinatra/Ruby in this brief time.
- Would have created some sort of log in or unique identifier stored in a cookie/browser's localstorage to differentiate users (currently only built for a single user).
- Normally would have made more user friendly alerts either using toasts/modals rather than just javascript alerts.
- Used SQLite3 for this app since it was small in scale, if it were built for multiple users would have used a dedicated database server (Postgres or MySQL).
- Would have also included a option to delete movies from the favorites list.
- Add an option to first view the movie's title, year and plot before adding it to the favorites list but for the sake of this app just automatically added it when querying a movie.
