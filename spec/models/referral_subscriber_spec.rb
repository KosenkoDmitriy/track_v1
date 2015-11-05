require 'rails_helper'

RSpec.describe ReferralSubscriber do
  let(:user) { create :user }
  let(:client) { double(:mailchimp_api) }
  let(:list_id) { 1234 }

  let(:email) { Faker::Internet.email }

  subject { ReferralSubscriber.new(Base64.urlsafe_encode64(email),
                                   Base64.urlsafe_encode64(user.email)) }

  before :each do
    allow(subject).to receive(:client).and_return(client)
    allow(subject).to receive(:list_id).and_return(list_id)
  end

  it 'instantiates itself successfully' do
    expect(subject).to_not be false
  end

  it 'defines a call method that sends emails to mailchimp' do
    expect(client).to receive(:subscribe).with(subscribe_hash)
    subject.call
  end

  context 'when params are missing' do
    let(:bad_email) { '' }
    let(:bad_referrer) { '' }

    subject { ReferralSubscriber.new(bad_email, bad_referrer) }

    it 'does not subscribe anyone' do
      expect(client).to_not receive(:subscribe).with(subscribe_hash)
      expect(subject.call).to eq nil
    end
  end

  def subscribe_hash
    {
      id: list_id, email: { email: email },
      merge_vars: { REFERRER: user.email },
      double_optin: false
    }
  end
end
