## OMDB FAVORITES MOVIE APP

It was my first time writing an app in Sinatra/Ruby. I used react on the frontend, original was going to just write it vanilla js but figured the state management of react would be helpful on this project. Uses webpack and babel to transpile it into a bundle. 

Database is created on the fly.
Gemfile is included.

Setup:
```
bundle install 
export OMDB_API_KEY=XXXXXXX
```

To run locally listens on port 3000:
```
bundle exec rackup -p 3000
```

## Things I would do differently if this was going to be released to production
- Typically I would have written some unit tests, but since it was my first time writing an app in Sinatra and Ruby I hadn't had a chance to.
- Would have created some sort of log in or unique identifier store in a cookie/browser's localstorage to differentiate users (currently only built for a single user). 
- Normally would have made more user friendly alerts either using a toasts/modals rather than just javascript alerts.
- Used SQLite3 for this app since it was small in scale, if it were built for multiple users would have used a database server.
- Would have also included a option to delete movies from the favorites list.
- Add an option to first view the movie's title, year and plot before adding it to the favorites list but for the sake of this app just automatically added it when querying

