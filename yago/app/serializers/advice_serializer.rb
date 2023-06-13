class AdviceSerializer < ActiveModel::Serializer
  attributes :when, :description, :about, :value
end