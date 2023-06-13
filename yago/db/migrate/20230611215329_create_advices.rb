class CreateAdvices < ActiveRecord::Migration[7.0]
  def change
    create_table :advices do |t|
      t.string :value
      t.string :profession
      t.string :about
      t.string :description
      t.string :when

      t.timestamps
    end
  end
end
