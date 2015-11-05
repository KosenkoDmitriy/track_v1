Deface::Override.new(:virtual_path => 'spree/admin/shared/_header',
                     :name => 'add_cms_link',
                     :insert_before => 'nav',
                     :text => "<a class='to-cms' href='/admin' target='_blank'>Link to CMS</a>",
                     :namespaced => true)