class RemoveVideoEssence < ActiveRecord::Migration
  def change
    if table_exists?(:alchemy_essence_videos)
      drop_table :alchemy_essence_videos
    end
  end
end
