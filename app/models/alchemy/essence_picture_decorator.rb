Alchemy::EssencePicture.class_eval do

  #if Rails.env.production? || Rails.env.staging? || Rails.env.prod_mockup?
    def picture_url(options = {})
      return if picture.nil?
       params = picture_params(options)
       return picture.image_file.remote_url(host: "#{CLOUDFRONT_CONFIG['image_domain']}.#{CLOUDFRONT_CONFIG['host']}") if params[:crop].nil?
       routes.show_picture_path(params)
    end
end
