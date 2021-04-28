module Response
  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def has_value?(param)
    return false if
      param.nil? ||
      param == '' ||
      param.to_i == 0 # param is a string

    true
  end
end
