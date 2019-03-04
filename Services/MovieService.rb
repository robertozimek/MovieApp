require_relative './MovieDatabaseService.rb'
require_relative './OMDbApiService.rb'

class MovieService
  def initialize(api_key, database_name)
    @movie_db_service = MovieDatabaseService.new(database_name);
    @omdb_api_service = OMDbApiService.new(api_key);
  end

  def get_movie_by_title(title)
    movie = @movie_db_service.get_movie_by_title(title)
    return movie
  end


  def get_or_add_movie_by_title(title)
    movie = @movie_db_service.get_movie_by_search_term(title)

    if movie.nil?
      movie = get_from_api_and_save_search_term(title)
    end

    return movie
  end

  def get_all_movies()
    @movie_db_service.get_all_movies()
  end

  def save_movie(movie)
    @movie_db_service.update_movie(movie)
  end

  def cleanup()
      @movie_db_service.close()
  end

  private
  def get_from_api_and_save_search_term(title)
    movie = @omdb_api_service.get_movie_by_title(title)

    if movie.nil?
      return nil
    end

    @movie_db_service.add_search_term(title, movie.title)

    unless @movie_db_service.movie_exists(title)
      @movie_db_service.add_movie(movie)
    else
      movie = @movie_db_service.get_movie_by_title(movie.title)
    end

    return movie
  end
end