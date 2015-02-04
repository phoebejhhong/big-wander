class CreateGalleries < ActiveRecord::Migration
  def change
    create_table :galleries do |t|
      t.integer :owner_id, null: false
      t.string :title, null: false
      t.text :description

      t.timestamps null: false
    end

    add_index :galleries, :owner_id
  end
end
