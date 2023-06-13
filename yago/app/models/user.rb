class User < ApplicationRecord
  has_one :address
  has_many :quotes
  has_many :ip_addresses

  accepts_nested_attributes_for :address

  def current_quote
    quotes
      .active
      .last
      .api_result
      &.except('quoteId', 'available', 'quoteStatus')
  end

  def self.with_ip_address(ip_address)
    joins(:ip_addresses)
    .find_by(ip_addresses: { value: ip_address })
  end

  def self.with_token(token)
    joins(:quotes)
    .find_by(quotes: { token: token })
  end
end
