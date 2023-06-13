require 'rails_helper'

RSpec.describe Api::Advices, type: :request do
  describe 'GET /advices' do
    before do
      @profession = 'doctor'
      create_list(:advice, 3, profession: @profession)
    end

    it 'returns advices for a specific profession' do
      get '/api/advices', params: { profession: @profession }

      expect(response).to have_http_status(200)
      expect(response.content_type).to eq('application/json')

      advices = JSON.parse(response.body)
      expect(advices.size).to eq(3)
    end
  end
end
