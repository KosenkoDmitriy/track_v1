MAILCHIMP_CONFIG ||= YAML.load_file("#{Rails.root}/config/mailchimp.yml")[Rails.env]

Gibbon::API.api_key = MAILCHIMP_CONFIG['api_key']
Gibbon::API.timeout = 15
Gibbon::API.throws_exceptions = false
