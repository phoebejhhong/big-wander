class AddColumnToPanoItems < ActiveRecord::Migration
  def change
    add_column :pano_items, :votes, :integer, default: 0, null: false
  end
end
