class CreatePanoramas < ActiveRecord::Migration
  def change
    create_table :panoramas do |t|
      t.decimal :lat, null: false
      t.decimal :lng, null: false
      t.decimal :heading, null: false
      t.decimal :pitch, null: false

      t.timestamps null: false
    end
  end
end
