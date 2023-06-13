class GetNacebelCode
  include Interactor

  def call
    find_keyword
    context.codes = get_codes
  end

  def find_keyword
    case profession
    when 'doctor' then @keyword = 'medical'
    end
  end

  def get_codes
    Nacebel
      .where("label_en ILIKE ?", "%#{@keyword}%")
      .pluck(:code)
      .map { |code| format_code(code) }
  end

  def format_code(code)
    while code.length < 5
      code = "#{code}0"
    end
    code
  end

  delegate :profession, to: :context
end