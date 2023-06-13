module Api
  class Advices < Grape::API
    format :json
    formatter :json, Grape::Formatter::ActiveModelSerializers 
    resource :advices do
      params do
        requires :profession, type: String, desc: "Profession of the user"
      end
      get '', serializer: AdviceSerializer do
        Advice.where(profession: params[:profession])
      end
    end
  end
end
