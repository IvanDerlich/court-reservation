module RequestSpecHelper
  # Parse JSON response to ruby hash
  def json
    JSON.parse(response.body, object_class: OpenStruct)
  end
end