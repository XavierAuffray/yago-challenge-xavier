FactoryBot.define do
  factory :address do
    street_name { "Street Name" }
    house_number { "123" }
    box_number { "456" }
    postcode { "ABC123" }
    city { "City" }
    country { "Country" }
    user
  end
end