S3_CONFIG ||= YAML.load_file("#{Rails.root}/config/s3.yml")[Rails.env]
CLOUDFRONT_CONFIG ||= YAML.load_file("#{Rails.root}/config/cloudfront.yml")[Rails.env]

Spree.config do ||
  attachment_config = {
    s3_credentials: {
      access_key_id: S3_CONFIG['access_key_id'],
      secret_access_key: S3_CONFIG['secret_access_key']
    },

    storage: :s3,
    bucket: S3_CONFIG['images_bucket'],
    s3_permissions: S3_CONFIG['permissions'],
    url: ':s3_alias_url',
    s3_host_alias: "#{CLOUDFRONT_CONFIG['image_domain']}.#{CLOUDFRONT_CONFIG['host']}",
    s3_protocol: CLOUDFRONT_CONFIG['protocol'],

    styles: {
      mini: '100x100>',
      small: '160x160>',
      product: '500x500>',
      large: '750x750>'
    },

    path: '/spree/products/:id/:style/:basename.:extension',
    default_url: '/spree/products/:id/:style/:basename.:extension',
    default_style: 'product'
  }

  attachment_config.each do |key, value|
    Spree::Image.attachment_definitions[:attachment][key.to_sym] = value
  end
end
