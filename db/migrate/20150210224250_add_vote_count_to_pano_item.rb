class AddVoteCountToPanoItem < ActiveRecord::Migration
  def change
    add_column :pano_items, :votes_count, :integer
  end
end
