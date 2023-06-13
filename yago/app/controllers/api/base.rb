module Api
  class Base < Grape::API
    mount Api::Quotes
    mount Api::Advices
  end
end