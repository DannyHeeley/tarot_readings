import { createCardBoxes, shuffleAnimation } from './card_spread_container.js';
//import { resetElements } from './main.js';

describe("createCardBoxes tests", () => {
  let clickedCards;
  let myCard1Div;
  let myCard2Div;
  let myCard3Div;
  let container;
  let tarotDeck;
  let counter;
  let cardDiv;

  beforeEach(() => {
    clickedCards = new Set();
    myCard1Div = document.createElement("div");
    myCard2Div = document.createElement("div");
    myCard3Div = document.createElement("div");
    container = document.createElement("div");
    tarotDeck = [
      "The Fool",
      "The Magician",
      "The High Priestess",
      "The Empress",
      "The Emperor",
      "The Hierophant",
      "The Lovers",
      "The Chariot",
      "Strength",
      "The Hermit",
      "The Wheel of Fortune",
      "Justice",
      "The Hanged Man",
      "Death",
      "Temperance",
      "The Devil",
      "The Tower",
      "The Star",
      "The Moon",
      "The Sun",
      "Judgment",
      "The World",
      "The Ace of Wands",
      "The Two of Wands",
      "The Three of Wands",
      "The Four of Wands",
      "The Five of Wands",
      "The Six of Wands",
      "The Seven of Wands",
      "The Eight of Wands",
      "The Nine of Wands",
      "The Ten of Wands",
      "The Page of Wands",
      "The Knight of Wands",
      "The Queen of Wands",
      "The King of Wands",
      "The Ace of Cups",
      "The Two of Cups",
      "The Three of Cups",
      "The Four of Cups",
      "The Five of Cups",
      "The Six of Cups",
      "The Seven of Cups",
      "The Eight of Cups",
      "The Nine of Cups",
      "The Ten of Cups",
      "The Page of Cups",
      "The Knight of Cups",
      "The Queen of Cups",
      "The King of Cups",
      "The Ace of Swords",
      "The Two of Swords",
      "The Three of Swords",
      "The Four of Swords",
      "The Five of Swords",
      "The Six of Swords",
      "The Seven of Swords",
      "The Eight of Swords",
      "The Nine of Swords",
      "The Ten of Swords",
      "The Page of Swords",
      "The Knight of Swords",
      "The Queen of Swords",
      "The King of Swords",
      "The Ace of Pentacles",
      "The Two of Pentacles",
      "The Three of Pentacles",
      "The Four of Pentacles",
      "The Five of Pentacles",
      "The Six of Pentacles",
      "The Seven of Pentacles",
      "The Eight of Pentacles",
      "The Nine of Pentacles",
      "The Ten of Pentacles",
      "The Page of Pentacles",
      "The Knight of Pentacles",
      "The Queen of Pentacles",
      "The King of Pentacles"
    ];
    counter = 0;
    cardDiv = document.createElement("div");
    cardDiv.className = "box";
    cardDiv.style.gridArea = "1 / 1";
    container.appendChild(cardDiv);
  });

  test("first click on a card should add it to myCard1Div", () => {
    createCardBoxes([cardDiv], container, [], [], tarotDeck, myCard1Div, myCard2Div, myCard3Div);
    cardDiv.click();
    expect(myCard1Div.children.length).toBe(2);
    expect(counter).toBe(1);
    expect(clickedCards.size).toBe(1);
  });

  test("second click on a card should add it to myCard2Div", () => {
    createCardBoxes([cardDiv], container, [], [], tarotDeck, myCard1Div, myCard2Div, myCard3Div);
    cardDiv.click();
    cardDiv.click();
    expect(myCard2Div.children.length).toBe(2);
    expect(counter).toBe(2);
    expect(clickedCards.size).toBe(2);
  });

  test("third click on a card should add it to myCard3Div", () => {
    createCardBoxes([cardDiv], container, [], [], tarotDeck, myCard1Div, myCard2Div, myCard3Div);
    cardDiv.click();
    cardDiv.click();
    cardDiv.click();
    expect(myCard3Div.children.length).toBe(2);
    expect(counter).toBe(3);
    expect(clickedCards.size).toBe(3);
  });

  test("click events on cards should not be able to add more than 3 cards", () => {
    createCardBoxes([cardDiv], container, [], [], tarotDeck, myCard1Div, myCard2Div, myCard3Div);
    cardDiv.click();
    cardDiv.click();
    cardDiv.click();
    cardDiv.click();
    expect(myCard3Div.children.length).toBe(2);
    expect(counter).toBe(3);
    expect(clickedCards.size).toBe(3);
  });

  test("cardFrontInfo div should have correct innerHTML", () => {
    createCardBoxes([cardDiv], container, [], [], tarotDeck, myCard1Div, myCard2Div, myCard3Div);
    cardDiv.click();
    expect(myCard1Div.children[1].innerHTML).toBe("<h3>" + tarotDeck[0] + "</h3>");
    cardDiv.click();
    expect(myCard2Div.children[1].innerHTML).toBe("<h3>" + tarotDeck[0] + "</h3>");
    cardDiv.click();
    expect(myCard3Div.children[1].innerHTML).toBe("<h3>" + tarotDeck[0] + "</h3>");
  });

  test("onclick should toggle visibility of front and back images", () => {
    createCardBoxes([cardDiv], container, [], [], tarotDeck, myCard1Div, myCard2Div, myCard3Div);
    expect(cardDiv.children[0].style.display).toBe('none');
    expect(cardDiv.children[1].style.display).toBe('none');
    expect(cardDiv.children[2].style.display).toBe('block');
    cardDiv.click();

    expect(cardDiv.children[0].style.display).toBe('block');
    expect(cardDiv.children[1].style.display).toBe('grid');
    expect(cardDiv.children[2].style.display).toBe('none');

    cardDiv.click();

    expect(cardDiv.children[0].style.display).toBe('none');
    expect(cardDiv.children[1].style.display).toBe('none');
    expect(cardDiv.children[2].style.display).toBe('block');
    });
});

