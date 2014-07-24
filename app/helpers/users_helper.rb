module UsersHelper
  def number_of(object='deck', number=0)
    "#{number} #{object.pluralize(number)}"
  end
end
