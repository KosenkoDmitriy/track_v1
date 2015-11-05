require 'mailchimp'
include MandrillHelper

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  protect_from_forgery with: :null_session, if: Proc.new { |c| c.request.format == 'application/json' }

  has_mobile_fu false

  # before_filter :redirect_admin_user
  before_action :setup_mcapi

  def welcome
    order = current_spree_user.orders.first
    sendMandrillMail({
        template: '/mandrill/order_confirmation',
        subject: I18n.t('user_mailer.order_confirmed.subject'),
        locals: { order: order },
        to: [{
             :email=> order.email,
             :name=> "#{order.bill_address.firstname} #{order.bill_address.lastname}"
           }]
        })
    # raise UserMailer.welcome("jarretgabel@gmail.com", "Jarret Gabel").deliver.to_yaml
  end

  def men
    tops = []
    bottoms = []
    accessories = []

    @topVariants = []
    @bottomVariants = []
    @accessoryVariants = []

    products = find_products_by_taxons(["Men", "Tops", "Bottoms", "Accessories"])

    products.select do |product|
      taxon_names = product.taxons.map(&:name)
      tops.push(product) if taxon_names.include?("Men") && taxon_names.include?("Tops")
      bottoms.push(product) if taxon_names.include?("Men") && taxon_names.include?("Bottoms")
      accessories.push(product) if taxon_names.include?("Men") && taxon_names.include?("Accessories")
    end

    sort_by_featured(tops)
    sort_by_featured(bottoms)
    sort_by_featured(accessories)

    @topVariants = get_variants_by_color(tops)
    @bottomVariants = get_variants_by_color(bottoms)
    @accessoryVariants = get_variants_by_color(accessories)

    @banner = "mens-banner"

    # items that usually come from Alchemy, but they need to be passed here for the time being
    @page = get_page_meta("Men's")
    @topbg = "navy"
    @bgcolor = "purple"
    @bgimageurl = "/images/footer_bg.png"
    @galabel = "products_footer"

    render "products/index", layout: 'base'
  end

  def women
    tops = []
    bottoms = []
    accessories = []

    @topVariants = []
    @bottomVariants = []
    @accessoryVariants = []

    products = find_products_by_taxons(["Women", "Tops", "Bottoms", "Accessories"])

    products.select do |product|
      taxon_names = product.taxons.map(&:name)
      tops.push(product) if taxon_names.include?("Women") && taxon_names.include?("Tops")
      bottoms.push(product) if taxon_names.include?("Women") && taxon_names.include?("Bottoms")
      accessories.push(product) if taxon_names.include?("Women") && taxon_names.include?("Accessories")
    end

    sort_by_featured(tops)
    sort_by_featured(bottoms)
    sort_by_featured(accessories)

    @topVariants = get_variants_by_color(tops)
    @bottomVariants = get_variants_by_color(bottoms)
    @accessoryVariants = get_variants_by_color(accessories)

    @banner = "womens-banner"

    # items that usually come from Alchemy, but they need to be passed here for the time being
    @page = get_page_meta("Women's")
    @topbg = "navy"
    @bgcolor = "purple"
    @bgimageurl = "/images/footer_bg.png"
    @galabel = "products_footer"

    render "products/index", layout: 'base'
  end

  def return_order_test
    Mailer.delay.return_order "jarretgabel@gmail.com", "order_number", "Northway"
    render json: { success: true, message: "Your mail has been sent." }
  end

  def return_order
    Mailer.return_order(params[:name], params[:email], params[:type], params[:order_number], params[:replacing], params[:desired], params[:comments]).deliver 
    render json: { success: true, message: "Your mail has been sent." }
  end


  def redirect_admin_user
  	login_route = 'shop/admin'
  	unless defined?(current_alchemy_user[:id])
  		if request.path.index('admin').to_s and not request.path.index('login').to_s
  			redirect_to "/#{login_route}/login"
  		end
  	end

  end

  def setup_mcapi
    @mc = Mailchimp::API.new(MAILCHIMP_CONFIG['api_key'])

  end

  private

  # get all products that match the provided taxons
  def find_products_by_taxons(taxons)
    Spree::Product.joins(:taxons).includes(:taxons).where(spree_taxons: { name: taxons }).where('available_on <= ?', DateTime.now)
  end

  # sort the provided products by whether or not the "featured" property is set
  def sort_by_featured(products)
    products.sort_by! { |product| [product.property("featured") ? -1 : 0, (product.available_on - DateTime.now).abs, product.name] }
  end

  # organize each product's variants by color (and by what variant is featured)
  def get_variants_by_color(products)
    variants = []

    products.each do |product|
      optionType = product.option_types.select { |type| type.presentation == "Color" }
      optionTypeId = optionType.length > 0 ? optionType.first.id : nil
      colors = []

      if optionTypeId
        product.variants.each do |var|
          var.option_values.each do |opt|
            if opt.option_type_id == optionTypeId
              unless colors.include?(opt.presentation)
                isFeatured = product.property("featured") && (product.property("featured") == opt.presentation) ? 1 : 0
                featuredImage = nil
                mainImage = nil

                var.images.each do |image|
                  if image.alt == "featured"
                    featuredImage = image
                  else
                    mainImage = image
                  end
                end

                if mainImage.nil?
                  mainImage = var.images[0]
                end

                if featuredImage.nil?
                  featuredImage = isFeatured ? var.images[1] : nil
                end

                variant = {
                  "name" => var.name,
                  "color" => opt.presentation,
                  "price" => var.price,
                  "image" => mainImage,
                  "isFeatured" => isFeatured,
                  "featuredImage" => featuredImage,
                  "object" => var
                }

                # move the featured variant to the beginning of the array
                if (isFeatured > 0)
                  variants.unshift(variant)
                else
                  variants.push(variant)
                end
                
                colors.push(opt.presentation)
              end
            end
          end
        end
      else
        isFeatured = product.property("featured") ? 1 : 0
        variant = {
          "name" => product.name,
          "color" => nil,
          "price" => product.price,
          "image" => product.variants[0].images[0],
          "isFeatured" => isFeatured,
          "featuredImage" => isFeatured ? product.variants[0].images[1] || nil : nil,
          "object" => product
        }
        variants.push(variant)
      end
    end

    variants
  end

  def get_page_meta(title)
    page = OpenStruct.new

    page.title = "All " + title + " Products"
    page.meta_description = "Premium quality performance running apparel.  Classically styled and made in the USA."
    page.meta_keywords = "running, running apparel, premium running apparel, luxury running clothes, tracksmith"
    page.elements = OpenStruct.new

    page
  end

end
