FactoryBot.define do
  factory :ip_address do
    value { "192.168.1.1" }
    user
  end
end