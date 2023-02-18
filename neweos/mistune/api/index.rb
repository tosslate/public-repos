require 'rouge'
require 'kramdown'
require 'kramdown-parser-gfm'

Handler = Proc.new do |request, response|
  response.header['Access-Control-Allow-Origin'] = '*'
  response.header['Access-Control-Allow-Methods'] = 'GET,OPTIONS,POST'

  if request.request_method === 'POST'
    response['Content-Type'] = 'text/plain; charset=utf-8'
    response.body = Kramdown::Document.new(request.body.force_encoding('utf-8'), input: 'GFM').to_html
  else
    response.status = 405
  end
end
