MAILCHIMP_CONFIG ||= YAML.load_file("#{Rails.root}/config/mailchimp.yml")[Rails.env]
