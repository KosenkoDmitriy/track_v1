require 'rails_helper'

RSpec.describe ReferringSubscriber do
  let(:client) { double(:mailchimp_api) }
  let(:list_id) { 1234 }

  let(:email) { Faker::Internet.email }

  subject { ReferringSubscriber.new(email) }

  before :each do
    allow(subject).to receive(:client).and_return(client)
    allow(subject).to receive(:list_id).and_return(list_id)
  end

  it 'instantiates itself successfully' do
    expect(subject).to_not be false
  end

  it 'subscribes or updates the emailer in mailchimp' do
    expect(client).to receive(:subscribe).with(update_hash)
    subject.call
  end

  def update_hash
    {
      id: list_id, email: { email: email },
      merge_vars: { :WOMENS_REFERRER => 'yes' },
      double_optin: false,
      update_existing: true
    }
  end
end
