== README

Rails v 4

Spree v 2.2

Alchemy-CMS v 3.0

Prereqs
Imagemagick
sqlite3


##To Install a Spree + Alchemy Ecomm Store:

$ rails new app-name  
$ cd app-name  
$ spree install --auto-accept  


add to gemfile: `gem 'alchemy_cms', github: 'magiclabs/alchemy_cms', branch: 'master'`  
add to config/routes: `mount Alchemy::Engine => '/cms'`   


$ bundle install


$ rails generate alchemy:scaffold  
$ rake alchemy:install:migrations  
$ rake db:migrate  
$ rake alchemy:db:seed  



*optional*
include better_errors and jazz_hands gems for better debugging using Pry

```
group :development do
  gem "better_errors"
  gem 'jazz_hands'
end
```



## To use Spree admin as Alchemy admin:

### Step 1: Assign Alchemy user class to Spree:User

config/initializers/alchemy.rb

```ruby
Alchemy.user_class_name = 'Spree::User'
Alchemy.login_path = 'spree_login_path'
Alchemy.logout_path = 'spree_logout_path'
Alchemy.current_user_method = 'spree_current_user'
```

### Step 2: Add alchemy_roles method to Spree::User Clsas
models/spree/user_decorator.rb

```ruby
Spree::User.class_eval do

  def alchemy_roles
    if self.has_spree_role?('admin')
      %w(admin)
    end
  end

end
```

to test:
log into Spree as admin (if you didn't make an admin account, you can make one by running bundle exec rake spree_auth:admin:create)
then, go to /cms/admin and you should be logged into alchemy

## To create Alchemy Essences with Spree Products

### Step 1

- Create Alchemy models for each essence

  - models/alchemy/essence_spree_product.rb

```ruby
module Alchemy
  class EssenceSpreeProduct < ActiveRecord::Base
    belongs_to :product, class_name: "Spree::Product", foreign_key: 'spree_product_id', readonly: true

    acts_as_essence(
      ingredient_column: 'spree_product_id',
      preview_text_method: 'name'
    )

    def ingredient
      product
    end
  end
end
```

  - models/alchemy/essence_spree_taxon.rb

```ruby
module Alchemy
  class EssenceSpreeTaxon < ActiveRecord::Base
    belongs_to :taxon, class_name: "Spree::Taxon", foreign_key: 'taxon_id', readonly: true

    acts_as_essence(
      ingredient_column: 'taxon_id',
      preview_text_method: 'name'
    )

    def ingredient
      taxon
    end
  end
end
```


- Create Views for each essence

  - views/alchemy/essences/_essence_spree_product_editor.html.erb
  - views/alchemy/essences/_essence_spree_product_view.html.erb
  - views/alchemy/essences/_essence_spree_taxon_editor.html.erb
  - views/alchemy/essences/_essence_spree_taxon_view.html.erb

- Create Element containing the essences in config/alchemy/elements

```
    - name: product
      contents:
      - name: spree_product
        type: EssenceSpreeProduct
      - name: spree_taxon
        type: EssenceSpreeTaxon
```

- Create Migration files for the essences

  rails g migration CreateAlchemyEssenceSpreeProducts
  rails g migration CreateAlchemyEssenceSpreeTaxons

```ruby
  class CreateAlchemyEssenceSpreeProducts < ActiveRecord::Migration
    def change
      create_table :alchemy_essence_spree_products do |t|
        t.integer :spree_product_id
      end
      add_index :alchemy_essence_spree_products, :spree_product_id
    end
  end

  class CreateAlchemyEssenceSpreeTaxons < ActiveRecord::Migration
  def change
    create_table :alchemy_essence_spree_taxons do |t|
      t.references :taxon

      t.timestamps
    end
    add_index :alchemy_essence_spree_taxons, :taxon_id
  end
end
```

- Run migration and relaunch the server!




###Alchemy Command Line Helpers

rails g alchemy:page_layouts --skip  
rails g alchemy:elements --skip
