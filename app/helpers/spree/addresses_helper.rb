module Spree::AddressesHelper
  def address_field(form, method, address_id = "b", &handler)
    content_tag :p, :id => [address_id, method].join, :class => "field" do
      if handler
        handler.call
      else
        is_required = Spree::Address.required_fields.include?(method)
        # separator = is_required ? '<span class="required">*</span><br />' : '<br />'
        # form.label(method) + separator.html_safe +

        case method
        when :firstname
          placeholder = Spree.t(:first_name)+" *"
        when :lastname
          placeholder = Spree.t(:last_name)+" *"
        when :address1
          placeholder = Spree.t(:street_address)+" *"
        when :address2
          placeholder = Spree.t(:street_address_2)
        when :city
          placeholder = Spree.t(:city)+" *"
        when :zipcode
          placeholder = Spree.t(:zipcode)+" *"
        when :phone
          placeholder = Spree.t(:phone)+" *"
        end

        form.text_field(method, :class => is_required ? 'required' : nil, :placeholder => placeholder)
      end
    end
  end

  def address_state(form, country, address_id)
    country ||= Spree::Country.find(Spree::Config[:default_country_id])
    have_states = !country.states.empty?
    state_elements = [
      form.collection_select(:state_id, country.states.order(:name),
                            :id, :name,
                            {:include_blank => 'State'},
                            {:class => have_states ? "required" : "hidden",
                            :disabled => !have_states}) +
      form.text_field(:state_name,
                      :class => !have_states ? "required" : "hidden",
                      :disabled => have_states)
      ].join.gsub('"', "'").gsub("\n", "")

      content_tag(:noscript, form.text_field(:state_name, :class => 'required')) +
      javascript_tag("document.write(\"#{state_elements.html_safe}\");")
  end
end