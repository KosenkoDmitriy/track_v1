Deface::Override.new(:virtual_path => 'spree/checkout/_confirm',
                     :name => 'add_shipping_copy',
                     :insert_after => ".form-buttons[data-hook='buttons']",
                     :text => "<p class='international'>For international orders, please note that customs clearance is different in every country and that you may be charged additional fees, tariffs and brokerage fees on top of postage charges. These additional charges are your responsibility.</p>",
                     :namespaced => true)