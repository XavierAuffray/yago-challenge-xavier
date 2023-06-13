module Api
  class Quotes < Grape::API
    format :json
    formatter :json, Grape::Formatter::ActiveModelSerializers 
    resource :quotes do
      desc 'Archive quotes of a user'
      params do
        optional :ip_address, type: String
        optional :token, type: String
        at_least_one_of :ip_address, :token
      end
      put 'archive' do
        if params[:token]
          user = User.with_token(params[:token])
        elsif params[:ip_address]
          user = User.with_ip_address(params[:ip_address])
        end
        user.quotes.update_all(active: false) if user
        if user.nil?
          params[:token] = SecureRandom.hex(10) if params[:token].nil?
          user = User.create!
          user.ip_addresses.create!(value: params[:ip_address]) if params[:ip_address]
        end
        Quote.create!(user: user)
      end

      desc 'Create the professional liability quote'
      params do
        requires :annualRevenue, type: Integer
        requires :enterpriseNumber, type: String, regexp: /^0\d{9}$/
        requires :legalName, type: String
        requires :profession, type: String
        optional :personType, type: String, values: %w[natural_person legal_person], default: 'legal_person'
        optional :deductibleFormula, type: String, values: %w[small medium large], default: 'medium'
        optional :coverageCeilingFormula, type: String, values: %w[small large], default: 'small'
        requires :ip_address, type: String
        optional :user_params, type: Hash do
          requires :first_name, type: String
          requires :last_name, type: String
          requires :email, type: String
          requires :phone_number, type: String
          requires :profession, type: String
          requires :address_attributes, type: Hash do
            requires :street_name, type: String
            requires :house_number, type: String
            optional :box_number, type: String
            requires :postcode, type: String
            requires :city, type: String
            requires :country, type: String
          end
        end
      end
      post '' do
        quote = ProfessionalLiability.call(form: params)
        error!(quote.error, 422) if quote.failure?

        if params[:ip_address]
          user = User.with_ip_address(params[:ip_address])
          if user
            user.quotes.active.last.update!(api_result: quote.result)
          else
            user = User.create!(params[:user_params])
            user.ip_addresses.create!(value: params[:ip_address])
            user.quotes.create!(api_result: quote.result, token: SecureRandom.hex(10))
          end
        end
        UserMailer.retreive_quote(user.quotes.active.last).deliver_later

        { quote: quote.result }
      end

      desc 'Return the professional liability quote with a token or an ip address'
      params do
        optional :token, type: String
        optional :ip_address, type: String
        at_least_one_of :token, :ip_address
      end
      get '' do
        if params[:token] != 'null'
          user = User.with_token(params[:token])
          if user && params[:ip_address]
            if user.ip_addresses.find_by(value: params[:ip_address]).nil?
              user.ip_addresses.create!(value: params[:ip_address])
            end
          end
          if user
            {
              user: { 
                first_name: user.first_name,
                last_name: user.last_name
              },
              quote: { 
                quote: Quote.find_by(token: params[:token]).api_result
              }
            }
          else
            nil
          end
        elsif params[:ip_address] != 'null'
          user = User.with_ip_address(params[:ip_address])
          user ? UserSerializer.new(user).as_json : nil
        end
      end
    end
  end
end
