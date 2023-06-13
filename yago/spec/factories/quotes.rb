FactoryBot.define do
  factory :quote do
    active { true }
    api_result { { result: "API Result" }.to_json }
    token { SecureRandom.hex(10) }
    user
  end
end