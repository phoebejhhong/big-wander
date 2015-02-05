class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :label, null: false

      t.timestamps null: false
    end

    create_table :taggings do |t|
      t.integer :pano_item_id, null: false
      t.integer :tag_id, null: false
    end

    add_index :taggings, :pano_item_id
    add_index :taggings, :tag_id
  end
end
