# Configure Spree Preferences
#
# Note: Initializing preferences available within the Admin will overwrite any changes that were made through the user interface when you restart.
#       If you would like users to be able to update a setting with the Admin it should NOT be set here.
#
# In order to initialize a setting do:
# config.setting_name = 'new value'
Spree.config do |config|
  # Example:
  # Uncomment to override the default site name.
  # config.site_name = "Spree Demo Site"
  config.site_name = "Tracksmith"
  config.admin_interface_logo = 'logo/logo.png'
  config.logo = 'logo/logo.png'
  config.always_include_confirm_step = true
  config.display_currency = false
  config.allow_guest_checkout = false
  config.track_inventory_levels = true
  config.allow_ssl_in_staging = false
  config.allow_ssl_in_production = true
  config.override_actionmailer_config = false

  if Rails.env.production?
    config.shipstation_username = ""
    config.shipstation_password = ""
    config.shipstation_weight_units = "Ounces"
    config.shipstation_number = :shipment
  elsif Rails.env.staging? || Rails.env.development?
    config.shipstation_username = "mobispoke"
    config.shipstation_password = "mobispoke123"
    config.shipstation_weight_units = "Ounces"
    config.shipstation_number = :shipment
  end

end

config = Rails.application.config
config.spree.calculators.shipping_methods << Spree::Calculator::TieredFlatRateShipping

Spree::Auth::Config[:registration_step] = true;

Spree.user_class = "Spree::User"
