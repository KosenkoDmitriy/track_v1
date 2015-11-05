Deface::Override.new(:virtual_path => 'spree/checkout/payment/_gateway',
                     :name => 'add_cvv_copy',
                     :insert_after => ".cvv-link",
                     :partial => "spree/content/cvv.html.erb")
