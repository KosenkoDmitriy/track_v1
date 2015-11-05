# This migration comes from spree_asset_variant_options (originally 20140115160024)
class AddIdToSpreeAssetsVariants < ActiveRecord::Migration
  def change
    add_column :spree_assets_variants, :id, :primary_key
    rename_column :spree_assets_variants, :asset_id, :image_id
  end
end
