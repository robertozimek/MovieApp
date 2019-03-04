require 'httparty'
require 'uri'
require_relative '../Services/OMDbApiService.rb'
require_relative '../Models/Movie.rb'

class OMDbApiService
  def initialize(api_key)
    @api_key_query = 'apikey=' + api_key
    @base_uri = URI::HTTP.build(:host => 'www.omdbapi.com', :query => @api_key_query)
  end

  def get_movie_by_title(movie_title)
    movie_query_uri = OMDbApiService.get_uri_with_params(@base_uri, type: 'movie', t: movie_title)
    response = HTTParty.get(movie_query_uri.to_s)
    json = response.parsed_response

    unless json['Response'] == 'False' || response.code != 200
      OMDbApiService.convert_json_to_movie(json)
    end
  end

  private
  def self.get_uri_with_params(uri, params = {})
    new_uri = uri.clone
    params = Hash[URI.decode_www_form(new_uri.query || '')].merge(params)
    new_uri.query = URI.encode_www_form(params)
    new_uri.to_s
  end

  def self.append_query_to_uri(uri, additional_query)
    new_uri = uri.clone
    new_uri.query = [new_uri.query, additional_query].compact.join('&')
    return new_uri
  end

  def self.convert_json_to_movie(json)
    return Movie.new(json['Title'], json['Year'], json['Plot'], json['Poster'])
  end
end