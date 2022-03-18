class DataController < ApplicationController
  def index
  end

  def ajax
    #Yahoo!!Japan 主要トピックス
    #url = 'https://news.yahoo.co.jp/rss/topics/top-picks.xml'
    #福岡オープンデータ
    url = 'https://www.open-governmentdata.org/fukuoka-pref/news/feed.rss'
    uri = URI.parse(url)
    response = Net::HTTP.get_response(uri)
    render plain:Hash::from_xml(response.body).to_json
=begin
    if params[:name] then
      data = Datum.where 'name like ?', '%' + params[:name] + '%'
    else
      data = Datum.all
    end
    render plain:data.to_json
=end
  end
end
