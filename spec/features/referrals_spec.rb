require 'rails_helper'

RSpec.feature 'Submitting Referrals' do
  let!(:lingo) { create :language }
  let!(:email1) { Faker::Internet.email }
  let!(:email2) { Faker::Internet.email }
  let!(:email3) { Faker::Internet.email }
  let!(:referrer) { Faker::Internet.email }
  let(:host) { {host: 'tracksmith.com'} }

  before :each do
    MandrillMailer::deliveries.clear
    allow(MandrillMailer).to receive_message_chain(:configure, :default_url_options) {host}
    visit '/referrals/new'
  end

  scenario 'displays the referral form' do
    expect(page).to have_css('form#referral_form')
  end

  scenario 'submits the form correctly' do
    within('#referral_form') do
      fill_in 'referral[referring]', with: referrer
      fill_in 'referral[email1]', with: email1
      fill_in 'referral[email2]', with: email2
      fill_in 'referral[email3]', with: email3
    end
    click_button 'Submit'

    expect(page.current_path).to eq '/shop/'
    expect(page).to have_content('Rerrals on their way. Friend\'s happiness increasing wildly')
    expect(MandrillMailer.deliveries.count).to be > 1
  end
end
