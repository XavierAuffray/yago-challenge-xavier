class CreateNacebels < ActiveRecord::Migration[7.0]
  def change
    create_table :nacebels do |t|
      t.string :level_nr
      t.string :code
      t.string :parent_code
      t.string :label_nl
      t.string :label_fr
      t.string :label_de
      t.string :label_en

      t.timestamps
    end
  end
end
