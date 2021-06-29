module Response
  def json_response(object, status = :ok)
    render json: object, status: status
  end

  def _has_value?(param)
    return false if
      param.nil? ||
      param == '' ||
      param.to_i.zero? # param is a string

    true
  end
end
