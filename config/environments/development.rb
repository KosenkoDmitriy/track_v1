Track::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Code is not reloaded between requests.
  config.cache_classes = false

  # Eager load code on boot. This eager loads most of Rails and
  # your application in memory, allowing both threaded web servers
  # and those relying on copy on write to perform better.
  # Rake tasks automatically ignore this option for performance.
  config.eager_load = false

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local = true
  config.action_controller.perform_caching = false

  # Enable Rack::Cache to put a simple HTTP cache in front of your application
  # Add `rack-cache` to your Gemfile before enabling this.
  # For large-scale production use, consider using a caching reverse proxy like nginx, varnish or squid.
  # config.action_dispatch.rack_cache = true

  # Raise an error on page load if there are pending migrations
  config.active_record.migration_error = :page_load

  # Do not minify code for debugging purposes.
  config.assets.debug = false

  # Set to :debug to see everything in the log.
  config.log_level = :info

  config.assets.digest = true

  MANDRILL_APIKEY = ''

  # Next line is needed for mailer to render templates properly
  config.mandrill_mailer.default_url_options = {:host => '0.0.0.0:3000'}

  config.action_mailer.perform_deliveries = true
  config.action_mailer.raise_delivery_errors = true
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: 'smtp.gmail.com',
    port: 587,
    domain: 'tracksmith.com',
    user_name: '',
    password: '',
    authentication: 'plain',
    enable_starttls_auto: true
  }

end
