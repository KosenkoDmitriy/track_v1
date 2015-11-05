class ChangePrelaunchCouponAppliedDefault < ActiveRecord::Migration
  def change
  	change_column :prelaunch_coupons, :applied, :string, default: "false"
  end
end
