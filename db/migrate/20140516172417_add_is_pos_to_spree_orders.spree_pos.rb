# This migration comes from spree_pos (originally 20131014053417)
class AddIsPosToSpreeOrders < ActiveRecord::Migration
  def change
    add_column :spree_orders, :is_pos, :boolean, :default => false, null: false
    add_index :spree_orders, :is_pos
  end
end
