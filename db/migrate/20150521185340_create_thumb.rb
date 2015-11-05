class CreateThumb < ActiveRecord::Migration
  def change
    create_table :thumbs do |t|
      t.string :job
      t.string :uid
    end
  end
end
