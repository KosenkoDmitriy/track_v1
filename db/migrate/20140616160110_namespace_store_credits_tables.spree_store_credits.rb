# This migration comes from spree_store_credits (originally 20120127100416)
class NamespaceStoreCreditsTables < ActiveRecord::Migration
  def change
    rename_table :store_credits, :spree_store_credits
  end
end
