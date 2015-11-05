class CreatePrelaunchCoupons < ActiveRecord::Migration
  def change
    create_table :prelaunch_coupons do |t|
      t.string :code
      t.string :level
      t.string :applied, default: false

      t.timestamps
    end
  end
end
