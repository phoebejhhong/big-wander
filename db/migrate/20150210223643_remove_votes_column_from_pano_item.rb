class RemoveVotesColumnFromPanoItem < ActiveRecord::Migration
  def change
    remove_column :pano_items, :votes
  end
end
