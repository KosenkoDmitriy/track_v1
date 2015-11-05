module Alchemy
  module PageHelper
    def image_for_platform(element)
      background_image = element.essence(:background_image)
      mobile_image = element.essence(:mobile_image)
      
      if (is_mobile_device? || is_tablet_device?) && mobile_image.picture_url.present?
        mobile_image
      else
        background_image
      end
    end
  end
end