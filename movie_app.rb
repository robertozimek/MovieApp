require 'sinatra/base'
require 'sinatra/config_file'
require_relative './Services//MovieService.rb'

class MovieApp < Sinatra::Base
  register Sinatra::ConfigFile
  config_file 'configurations.yml'

  before do
    content_type 'application/json'
    @movie_service = MovieService.new(settings.OMDB_API_KEY, settings.DATABASE_NAME)
  end

  get '/' do
    content_type 'html'
    erb :index
  end

  get '/all_movies' do
    movies = @movie_service.get_all_movies()

    movies.to_json
  end

  post '/search_movie' do
    request.body.rewind
    @params = JSON.parse request.body.read
    movie = @movie_service.get_or_add_movie_by_title(params['title'])

    if movie.nil?
      status 404
      return { message: "Not Found" }.to_json
    end

    movie.to_json
  end

  post '/rating' do
    request.body.rewind
    @params = JSON.parse request.body.read
    movie = @movie_service.get_movie_by_title(params['title']);

    movie.rating = params['rating']

    @movie_service.save_movie(movie)

    movie.to_json
  end

  post '/comment' do
    request.body.rewind
    @params = JSON.parse request.body.read
    movie = @movie_service.get_movie_by_title(params['title']);

    movie.comment = params['comment']

    @movie_service.save_movie(movie)

    movie.to_json
  end

  after do
    @movie_service.cleanup()
  end
end