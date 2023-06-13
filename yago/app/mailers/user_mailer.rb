class UserMailer < ApplicationMailer
  def retreive_quote(quote)
    @name = quote.user.first_name
    path = Dir.pwd.split('/')[0..-2].join('/') + '/frontend/index.html'
    @url = "file://#{path}?token=#{quote.token}"
    mail(to: quote.user.email, subject: "Your quote from Yago")
  end
end
