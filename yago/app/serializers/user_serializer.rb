class UserSerializer < ActiveModel::Serializer
  attributes :user, :quote

  def user
    { 
      first_name: object.first_name,
      profession: object.profession
    }
  end

  def quote
    { quote: object.current_quote }    
  end
end
