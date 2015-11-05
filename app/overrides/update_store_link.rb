Deface::Override.new(:virtual_path => 'spree/layouts/admin/_login_nav',
                     :name => 'update_store_link',
                     :replace => "[data-hook='store-frontend-link']",
                     :text => "<li data-hook='store-frontend-link'><i class='icon-external-link'></i><%= link_to Spree.t(:back_to_store), '/', :target => '_blank' %></li>")