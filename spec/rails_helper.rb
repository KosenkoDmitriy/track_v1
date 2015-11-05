# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
require 'capybara/rails'
require 'capybara/poltergeist'
require 'mandrill_mailer/offline'

::ActiveSupport::Deprecation.silence do
  require 'spree/testing_support/url_helpers'
  require 'spree/testing_support/factories'
end

Capybara.register_driver :poltergeist_default do |app|
  options = {
    js_errors: false,
    debug: false,
    phantomjs_options: ['--load-images=no', '--disk-cache=false'],
    inspector: true
  }
  Capybara::Poltergeist::Driver.new(app, options)
end

RSpec.configure do |config|
  config.use_transactional_fixtures = false
  config.before(:suite) do
    DatabaseCleaner.strategy = :transaction
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do |example|
    if example.metadata[:js]
      DatabaseCleaner.strategy = :truncation
    else
      DatabaseCleaner.start
    end
  end

  config.after(:each) do |example|
    DatabaseCleaner.clean

    if example.metadata[:js]
      DatabaseCleaner.strategy = :transaction
    end
  end
  config.infer_spec_type_from_file_location!
  config.include Capybara::DSL
  config.include FactoryGirl::Syntax::Methods
end
