require 'rails_helper'

RSpec.describe ReferringMailer do
  let(:referrer) { 'referrer@gmail.com' }

  before :each do
    MandrillMailer::deliveries.clear
  end

  subject { ReferringMailer.reward(referrer) }

  it 'sends the referrer an email with their shipping code' do
    expect(subject.message['subject']).to eq 'Thanks For Inviting Your Friends'
  end
end
