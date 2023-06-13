class Quote < ApplicationRecord
  belongs_to :user
  scope :active, -> { where(active: true) }
end
