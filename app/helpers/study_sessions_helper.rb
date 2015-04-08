module StudySessionsHelper
  def study_session_count_for(count)
    case count
    when 0
      "This deck hasn't been studied yet."
    when 1
    '1 study session.'
    else
      "#{count} study sessions."
    end
  end
end
