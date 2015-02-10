class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.integer :pano_item_id, null: false
      t.integer :voter_id, null: false

      t.timestamps null: false
    end

    add_index :votes, :pano_item_id
    add_index :votes, :voter_id
    add_index :votes, [:pano_item_id, :voter_id], unique: true
  end
end
