require 'rails_helper'

RSpec.describe ReferralsMailer do
  let(:email1) { Faker::Internet.email }
  let(:email2) { Faker::Internet.email }
  let(:user) { create :user }
  let(:host) { {host: 'tracksmith.com'} }

  before :each do
    MandrillMailer::deliveries.clear
    allow(MandrillMailer).to receive_message_chain(:configure, :default_url_options) {host}
  end

  subject { ReferralsMailer.refer([email1, email2], user.email) }

  context 'successfully' do
    it 'sends a referral mailer with subject' do
      expect(subject.message['subject']).to eq 'Your friend wants you to meet Tracksmith'
    end

    it 'sends a referral mailer with correctly formatted emails' do
      expect(subject.message['to']).to eq [{ email: email1, name: '' },
                                           { email: email2, name: '' }]
    end

    it 'sends a correctly formatted url for the referree to click on' do
      expect(merge_vars_url).to match(%r{http:\/\/tracksmith\.com/})
    end

    it 'base64 encodes the email addresses for the url' do
      expect(merge_vars_url).to include(Base64.urlsafe_encode64(email1))
      expect(merge_vars_url).to include(Base64.urlsafe_encode64(user.email))
    end
  end

  def merge_vars_url
    subject.message['merge_vars'].first['vars'].first['content']
  end
end
