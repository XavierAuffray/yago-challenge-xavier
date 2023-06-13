class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :street_name
      t.string :house_number
      t.string :box_number
      t.string :postcode
      t.string :city
      t.string :country
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
