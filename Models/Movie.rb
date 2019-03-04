class Movie
  attr_accessor :id
  attr_accessor :title
  attr_accessor :year
  attr_accessor :plot
  attr_accessor :poster_uri
  attr_accessor :rating
  attr_accessor :comment

  def initialize(title = nil, year = nil, plot = nil, poster_uri = nil, rating = nil, comment = nil)
    @title = title
    @year = year
    @plot = plot
    @poster_uri = poster_uri
    @rating = rating
    @comment = comment
  end

  def as_json(options={})
    {
        title: @title,
        year: @year,
        plot: @plot,
        poster_uri: @poster_uri,
        rating: @rating,
        comment: @comment
    }
  end

  def to_json(*options)
    as_json(*options).to_json(*options)
  end
end