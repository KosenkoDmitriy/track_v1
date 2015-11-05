Deface::Override.new(:virtual_path => 'spree/checkout/payment/_gateway',
                     :name => 'change_cvv_link',
                     :remove => "#cvv_link, [data-hook='cvv_link']",
                     :insert_after => "#card_code",
                     :text =>  "<%= link_to 'What is this?', '/', :id => 'new_cvv', {:class => cvv-link} %>"
                  	)

       
