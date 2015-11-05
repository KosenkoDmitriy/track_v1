# This migration comes from spree_pos (originally 20130723140316)
class AddDeliveredAtAndCanceledAtToSpreeShipments < ActiveRecord::Migration
  def change
    add_column :spree_shipments, :delivered_at, :datetime
    add_column :spree_shipments, :canceled_at, :datetime
  end
end
