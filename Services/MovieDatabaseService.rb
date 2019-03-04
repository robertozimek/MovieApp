require 'sqlite3'
require_relative '../Models/Movie.rb'

class MovieDatabaseService
  def initialize(database_name)
    @database = SQLite3::Database.new database_name
    @database.results_as_hash = true
    @database.execute(%{
      CREATE TABLE IF NOT EXISTS Movie(
        title TEXT NOT NULL PRIMARY KEY,
        year INTEGER NOT NULL,
        plot TEXT NULL,
        poster_uri TEXT NULL,
        rating INTEGER NULL,
        comment TEXT NULL
      );
    })

    @database.execute(%{
      CREATE TABLE IF NOT EXISTS Search_Term(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        term TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL
      );
    })
  end

  def get_movie_by_search_term(term)
    @database.execute(%{
      SELECT
        m.title,
        m.year,
        m.plot,
        m.poster_uri,
        m.rating,
        m.comment
      FROM Search_Term st
      INNER JOIN Movie m on m.title = st.title
      WHERE term = ?
    }, term) do |row|
      return MovieDatabaseService.convert_row_to_movie(row)
    end
  end

  def add_search_term(term, title)
    @database.execute('INSERT INTO Search_Term (term, title) VALUES (?,?)', [term, title])
  end

  def movie_exists(title)
    @database.execute('SELECT 1 FROM Movie WHERE title = ?', title ).length > 0
  end

  def add_movie(movie)
    @database.execute(%{
      INSERT INTO Movie
        (title, year, plot, poster_uri, rating, comment)
      VALUES (?,?,?,?,?,?)
      }, [ movie.title, movie.year, movie.plot, movie.poster_uri, movie.rating, movie.comment ])
  end

  def get_movie_by_id(id)
    results = @database.execute('SELECT * FROM Movie WHERE id = ?', id)

    unless results.empty?
      results do |row|
        return MovieDatabaseService.convert_row_to_movie(row)
      end
    end

  end

  def get_movie_by_title(title)
    @database.execute('SELECT * FROM Movie WHERE title = ?', title) do |row|
      return MovieDatabaseService.convert_row_to_movie(row)
    end
  end

  def update_movie(movie)
    @database.execute(%{
      UPDATE Movie
      SET title = ?, year = ?, plot = ?, poster_uri = ?, rating = ?, comment = ?
      WHERE title = ?
    }, [ movie.title, movie.year, movie.plot, movie.poster_uri, movie.rating, movie.comment, movie.title])
  end

  def get_all_movies()
    movies = []
    @database.execute('SELECT * FROM Movie ORDER BY title COLLATE NOCASE') do |row|
      movies.push(MovieDatabaseService.convert_row_to_movie(row))
    end
    movies
  end

  def close()
    unless @database.closed?
      @database.close()
    end
  end

  private
  def self.convert_row_to_movie(row)
    return Movie.new(row['title'], row['year'], row['plot'], row['poster_uri'], row['rating'], row['comment'])
  end

end