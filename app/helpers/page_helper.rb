module PageHelper
  def unique_page_elements
    @page.try(:elements).try(:reduce, []) do |array, element|
      array.push(element.name) unless element.position.nil? or array.include?(element.name)
      array
    end
  end
end