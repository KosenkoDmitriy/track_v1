require 'dragonfly/s3_data_store'

S3_CONFIG ||= YAML.load_file("#{Rails.root}/config/s3.yml")[Rails.env]
CLOUDFRONT_CONFIG ||= YAML.load_file("#{Rails.root}/config/cloudfront.yml")[Rails.env]

pictures = Dragonfly.app(:alchemy_pictures)
pictures.configure_with(:imagemagick)

pictures.configure do |config|
  datastore :s3,
    access_key_id: S3_CONFIG['access_key_id'],
    secret_access_key: S3_CONFIG['secret_access_key'],
    bucket_name: S3_CONFIG['images_bucket'],
    storage_headers: {'x-amz-acl' => S3_CONFIG['permissions']},
    root_path: "pictures"
end

# Attachments
attachments = Dragonfly.app(:alchemy_attachments)
attachments.configure do
  datastore :s3,
    access_key_id: S3_CONFIG['access_key_id'],
    secret_access_key: S3_CONFIG['secret_access_key'],
    bucket_name: S3_CONFIG['attachments_bucket'],
    storage_headers: {'x-amz-acl' => S3_CONFIG['permissions']},
    root_path: "pictures"
end

Dragonfly.app.configure do

  url_host = CLOUDFRONT_CONFIG['host']+CLOUDFRONT_CONFIG['attachments_domain']

  # Override the .url method...
  define_url do |app, job, opts|
    thumb = Thumb.find_by_signature(job.signature)
    # If (fetch 'some_uid' then resize to '40x40') has been stored already, give the datastore's remote url ...
    if thumb
      app.datastore.url_for(thumb.uid)
      # ...otherwise give the local Dragonfly server url
    else
      app.server.url_for(job)
    end
  end

  # Before serving from the local Dragonfly server...
  before_serve do |job, env|
    # ...store the thumbnail in the datastore...
    uid = job.store

    # ...keep track of its uid so next time we can serve directly from the datastore
    Thumb.create!(uid: uid, signature: job.signature)
  end

end
