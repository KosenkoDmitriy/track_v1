# This migration comes from spree_affiliate (originally 20101022121217)
class CreateAffiliates < ActiveRecord::Migration
  def self.up
    create_table :spree_affiliates do |t|
      t.integer :user_id
      t.integer :partner_id
      t.timestamps
    end
  end

  def self.down
    drop_table :spree_affiliates
  end
end
