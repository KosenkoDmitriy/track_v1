source 'http://rubygems.org'

gem 'rails', '~> 4.0.3'
gem 'sass-rails', '~> 4.0.0'
gem 'susy'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.0.0'
gem 'jquery-rails'
gem 'jquery-cookie-rails'
gem 'turbolinks'
gem 'jbuilder', '~> 1.2'
gem 'pg'
gem 'haml-rails', '~> 0.5.3'
gem 'delayed_job_active_record'
gem 'newrelic_rpm'
gem 'polyglot'
gem 'bourbon'
gem 'neat'
gem 'slim'

#SPREE
gem 'spree', github: 'spree/spree', branch: '2-2-stable'
gem 'spree_gateway', :git => 'https://github.com/spree/spree_gateway.git', :branch => '2-2-stable'
gem 'spree_auth_devise', :git => 'https://github.com/spree/spree_auth_devise.git', :branch => '2-2-stable'
gem 'spree_advanced_reporting', :git => 'https://github.com/mobispoke/spree_advanced_reporting', :branch => 'master'

#ALCHEMY
gem 'alchemy_cms', github: 'magiclabs/alchemy_cms', branch: '3.0-stable'

#SPREE EXTENSIONS
gem 'spree_variant_options_select', github: 'Wondersauce/spree_variant_options_select'
gem 'spree_asset_variant_options', :git => 'https://github.com/Wondersauce/spree_asset_variant_options.git'
gem 'spree_minicart', :git => 'https://github.com/Wondersauce/spree_minicart.git', :branch => 'master'
gem 'spree_affiliate', :git => 'https://github.com/spree/spree_affiliate.git', :branch => '2-2-stable'
gem "spree_shipstation", git: "https://github.com/jarretgabel/spree_shipstation"
gem 'spree_store_credits', :git => "https://github.com/spree/spree_store_credits.git", :branch => '2-2-stable'
gem "spree_address_book", :git => "git://github.com/Wondersauce/spree_address_book.git", :branch => '2-1-stable'

gem 'spree_active_shipping', :git => "git://github.com/spree/spree_active_shipping", :branch => '2-2-stable'

# to fix assume_from_symbol issue for Money::Class
gem 'money', '6.0.1'

# For S3 Storage
gem 'dragonfly-s3_data_store' # alchemy
gem 'aws-sdk' # spree
gem 'asset_sync', '~> 1.1.0'

gem 'mobile-fu'

gem 'google-tag-manager-rails'

# mailers
gem 'mandrill-api'
gem 'mandrill_mailer'
gem 'mailchimp-api', '~> 2.0.4'
gem 'gibbon'

group :doc do
  gem 'sdoc', require: false
end

group :development, :staging do
  gem 'better_errors'
end

group :development do
  # Use Capistrano for deployment
  gem 'capistrano', '~> 3.2.0'
  gem 'capistrano-rvm'
  gem 'capistrano-bundler'
  gem 'capistrano-rails'
  gem 'binding_of_caller'
end

group :development, :test do
  gem 'dotenv-rails', '< 2.0'
  gem 'byebug'
  gem 'awesome_print'
  gem 'pry-byebug'
  gem 'rspec-rails', '~> 3.2'
  gem 'factory_girl_rails'
end

group :test do
  gem 'ffaker'
  gem 'capybara'
  gem 'launchy'
  gem 'poltergeist'
  gem 'database_cleaner'
end
