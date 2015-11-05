Spree::Image.class_eval do
  attachment_definitions[:attachment][:styles] = {
    :mini => '100x100>', 
    :small => '160x160>', # images in cart
    :product => '500x500>', # products page?
    :large => '750x750>' # product detail page
  }
end
