class CreateQuotes < ActiveRecord::Migration[7.0]
  def change
    create_table :quotes do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.boolean :active, default: true
      t.jsonb :api_result
      t.string :token

      t.timestamps
    end
  end
end
