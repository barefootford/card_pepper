require 'spec_helper'

describe 'A Chapter' do 

  it 'can be created with the demo attributes' do 
    chapter = Chapter.new(chapter_attributes)
    expect(chapter.valid?).to be_true
  end

  it 'can be created from a parent deck' do 
    chapter = Chapter.new(chapter_attributes(deck_id:11))
    expect(chapter.valid?).to be_true
  end

  it 'cannot be created without a parent deck' do 
    chapter = Chapter.new(title: 'Ruby hand shakes')
    
    expect(chapter.valid?).to be_false
    expect(chapter.errors[:deck_id].any?).to be_true
  end
end