require 'rails_helper'

describe Api::Quotes, type: :request do
  describe 'PUT /api/quotes/archive' do
    let(:user) { create(:user) }
    let(:ip_address) { create(:ip_address, user: user) }
    let(:quote) { create(:quote, user: user) }

    it 'archives all quotes of a user using token' do
      put '/api/quotes/archive', params: { token: quote.token } do
        expect(user.reload.quotes.count).to eq(1)
        expect(user.reload.ip_addresses.count).to eq(1)
        expect(user.reload.quotes.active.count).to eq(0)
      end
    end

    it 'archives all quotes of a user using IP address' do
      put '/api/quotes/archive', params: { ip_address: ip_address } do
        expect(user.reload.quotes.active.count).to eq(0)
      end
    end
  end

  describe 'POST /api/quotes' do
    let(:params) do
      {
        :annualRevenue => 80000,
        :enterpriseNumber => "0649885171",
        :legalName => "example SA",
        :naturalPerson => true,
        :nacebelCodes => ["62010", "62020", "62030", "62090", "63110"],
        :profession => "Architect",
        :ip_address => create(:ip_address, user: create(:user)).value
      }
    end

    it 'creates a professional liability quote' do
      post '/api/quotes', params: params do
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe 'GET /api/quotes' do
    let(:user) { create(:user) }
    let(:quote) { create(:quote, user: user) }
    let(:ip_address) { create(:ip_address, user: user) }

    it 'returns the professional liability quote of a user using token' do
      get '/api/quotes', params: { token: quote.token }
      expect(response).to have_http_status(:success)
    end

    it 'returns the professional liability quote of a user using IP address' do
      get '/api/quotes', params: { ip_address: ip_address }
      expect(response).to have_http_status(:success)
    end
  end
end
