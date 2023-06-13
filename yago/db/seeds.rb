# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Advice.create!(
  profession: 'doctor',
  about: 'deductibleFormula',
  value: 'small',
  description: "it will reduce the price and it's not that important for you.",
  when: 'form'
)
Advice.create!(
  profession: 'doctor',
  about: 'coverageCeilingFormula',
  value: 'large',
  description: "this will protect you for much higher amounts that the default one in case of dangerous consequences of your action.",
  when: 'form'
)
Advice.create!(
  profession: 'doctor',
  about: 'legal expenses',
  value: 'true',
  description: "it is strongly recommended in your case as the risk are high. There's a high probability that the claim would be followed by legal actions. So you must be able to defend yourself.",
  when: 'quote'
)

ParseNacebel.call