require 'csv'

class ParseNacebel
  include Interactor

  def call
    parse_csv
  end

  def parse_csv
    csv_text = File.read(Rails.root.join('db', 'assets', 'NACEBEL_2008.csv'), encoding: 'iso-8859-1')
    csv = CSV.parse(csv_text, headers: true, col_sep: ';')
    csv.each do |row|
      create_nacebel_row(row)
    end
  end

  # ["Level nr", "Code", "Parent code", "Label NL", "Label FR", "Label DE", "Label EN"]
  def create_nacebel_row(row)
    Nacebel.create!(
      level_nr: row['Level nr'],
      code: row['Code'],
      parent_code: row['Parent code'],
      label_nl: row['Label NL'],
      label_fr: row['Label FR'],
      label_de: row['Label DE'],
      label_en: row['Label EN']
    )
  end
end
