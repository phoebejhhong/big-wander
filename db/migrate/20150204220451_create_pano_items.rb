class CreatePanoItems < ActiveRecord::Migration
  def change
    create_table :pano_items do |t|
      t.integer :gallery_id, null: false
      t.string :title, null: false
      t.decimal :lat, null: false, precision: 9, scale: 6
      t.decimal :lng, null: false, precision: 9, scale: 6
      t.decimal :heading, null: false, precision: 6, scale: 3
      t.decimal :pitch, null: false, precision: 6, scale: 3

      t.timestamps null: false
    end

    add_index :pano_items, :gallery_id
  end
end
