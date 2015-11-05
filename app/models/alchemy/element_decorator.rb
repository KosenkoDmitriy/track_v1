# == Schema Information
#
# Table name: alchemy_elements
#
#  id              :integer          not null, primary key
#  name            :string(255)
#  position        :integer
#  page_id         :integer
#  public          :boolean          default(TRUE)
#  folded          :boolean          default(FALSE)
#  unique          :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  creator_id      :integer
#  updater_id      :integer
#  cell_id         :integer
#  cached_tag_list :text
#

Alchemy::Element.class_eval do
  has_many :contents, -> { order(:created_at) }, dependent: :destroy
end


    
   