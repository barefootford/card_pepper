module ApplicationHelper
  def nevermind(path=root_url)
    <%= link_to "Nevermind", path, class:'btn btn-block' %>      
  end
end
