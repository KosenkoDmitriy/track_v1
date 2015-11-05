Track::Application.routes.draw do

  # This line mounts Spree's routes at the root of your application.
  # This means, any requests to URLs such as /products, will go to Spree::ProductsController.
  # If you would like to change where this engine is mounted, simply change the :at option to something different.
  #
  # We ask that you don't use the :as option here, as Spree relies on it being the default of "spree"

  get "maildev" => 'emaildev#index'

  get "welcome" => "application#welcome", path: "/shop/welcome/"
  get "return_order_test" => "application#return_order_test", path: 'shop/return_order_test'
  post "return_order" => "application#return_order", path: 'shop/return_order'
  post "mailchimp/subscribe" => "mailchimp#subscribe"
  post "mailchimp/subscribe_footer" => "mailchimp#subscribe_footer"
  post "mailchimp/notify_me" => "mailchimp#notify_me"

  resources 'referrals', except: [:delete, :update, :edit]
  post 'referrals/subscribe' => 'referrals#subscribe', as: :subscribe_referral
  get 'spreadtheword' => 'referrals#new', as: :create_referral

  match "/products", :to => redirect("/men"), via: :get
  match "/womens", :to => redirect("/women"), via: :get

  get "men" => "application#men", path: "/men"
  get "women" => "application#women", path: "/women"

  mount Spree::Core::Engine, :at => '/shop'
   # get 'cms/:id' => 'spree/products#show', :as => :product

  mount Alchemy::Engine => '/', :as => 'alchemy'

  Spree::Core::Engine.draw_routes




  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
