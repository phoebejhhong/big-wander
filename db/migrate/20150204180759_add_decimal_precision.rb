class AddDecimalPrecision < ActiveRecord::Migration
  def change
    change_column :panoramas, :lat, :decimal, precision: 9, scale: 6
    change_column :panoramas, :lng, :decimal, precision: 9, scale: 6
    change_column :panoramas, :heading, :decimal, precision: 6, scale: 3
    change_column :panoramas, :pitch, :decimal, precision: 6, scale: 3
  end
end
