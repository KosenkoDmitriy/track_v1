class AddOrderToPrelaunchCoupon < ActiveRecord::Migration
  def change
    add_column :prelaunch_coupons, :order_id, :integer
  end
end
