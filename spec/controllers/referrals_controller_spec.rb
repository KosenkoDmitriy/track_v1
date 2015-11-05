require 'rails_helper'

RSpec.describe ReferralsController do
  let(:user) { double('user', authenticate: true, email: 'don-wan@gmail.com') }
  let(:host) { {host: 'tracksmith.com'} }
  let(:order) { create :order }
  let!(:lingo) { create :language }

  before :each do
    allow(controller).to receive(:spree_current_user).and_return user
    allow(user).to receive(:last_incomplete_spree_order).and_return order
    allow(MandrillMailer).to receive_message_chain(:configure, :default_url_options) {host}
  end

  it 'responds to the index action' do
    get :index
    expect(subject.status).to eq 200
  end

  it 'responds to the new action' do
    get :new
    expect(subject.status).to eq 200
  end

  context 'CREATE action' do
    it 'responds with html' do
      post :create,
           referral: { referring: 'bob@bob.com',
                       email1: 'email1@gmail.com',
                       email2: 'email2@gmail.com' }
      expect(subject.status).to eq 302
    end

    it 'responds with json' do
      json = { format: :json,
               referral: { referring: 'bob@bob.com',
                           email1: 'email1@gmail.com',
                           email2: 'email2@gmail.com' } }
      post :create, json
      expect(subject.status).to eq 201
    end
  end

  context 'SUBSCRIBE action' do
    let(:email1) { Base64.urlsafe_encode64('email1@gmail.com') }
    let(:email2) { Base64.urlsafe_encode64('email2@gmail.com') }

    it 'responds with html' do
      post :subscribe,
           referral: { referred: email1,
                       referring: email2 }
      expect(subject.status).to eq 302
    end

    it 'responds with json' do
      json = { format: :json,
               referral: { referred: email1,
                           referring: email2 }}
      post :subscribe, json
      expect(subject.status).to eq 201
    end
  end
end
