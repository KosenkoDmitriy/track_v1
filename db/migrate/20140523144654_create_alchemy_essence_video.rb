class CreateAlchemyEssenceVideo < ActiveRecord::Migration
  def change
    return if table_exists?(:alchemy_essence_videos)
    create_table :alchemy_essence_videos do |t|
      t.integer  "attachment_id"
      t.integer  "width"
      t.integer  "height"
      t.boolean  "allow_fullscreen", :default => false
      t.boolean  "auto_play",        :default => false
      t.boolean  "show_navigation",  :default => false
      t.integer  "creator_id"
      t.integer  "updater_id"
      t.datetime "created_at",       :null => false
      t.datetime "updated_at",       :null => false
    end
  end
end
