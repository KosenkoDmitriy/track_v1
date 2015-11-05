class AddMissingCouponCodes < ActiveRecord::Migration
  def up
    add_column :spree_orders, :coupon_code, :string
  end

  def down
    remove_column :spree_orders, :coupon_code
  end
end
