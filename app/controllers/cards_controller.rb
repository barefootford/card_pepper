class CardsController < ApplicationController
  
  def study
    card1 = ['gesto',  'gesture']
    card2 = ['junto',  "together, joined, close"]
    card3 = ['nacional',  'national']
    card4 = ['descubrir',  'to discover']
    card5 = ['compañía',  'company']
    card6 = ['agua',  'water']
    card7 = ['sentimiento',  'feeling']
    card8 = ['plan',  'plan']
    card9 = ['quitar',  "to remove, take away"]
    card10 = ['cantar',  'to sing']
    cards = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10]
    @card = cards.sample
  end
end
