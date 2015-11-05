# This migration comes from spree_asset_variant_options (originally 20131212185245)
class CreateSpreeAssetsVariants < ActiveRecord::Migration
  def change
    create_table :spree_assets_variants, id: false do |t|
      t.references :asset, index: true
      t.references :variant, index: true
    end
  end
end
