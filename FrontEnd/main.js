//Load Axios library ------------------------------------------------------------

  let axios;
  try {
    axios = window.axios;
  } catch(error) {
    console.error('axios library not found. Make sure the library is loaded correctly.');
  }


//DEFINE VARIABLES ---------------------------------------------------------------

  // Define variables for the buttons
  const resetButton = document.getElementById("reset_button");
  const shuffleButton = document.getElementById("shuffle_button");
  const sendButton = document.getElementById("send-button");

  // Define variables for each of the selected cards
  const myCard1Div = document.getElementById("card_1");
  const myCard2Div = document.getElementById("card_2");
  const myCard3Div = document.getElementById("card_3");
  let chosenCardImage1 = document.createElement("img");
  let chosenCardImage2 = document.createElement("img");
  let chosenCardImage3 = document.createElement("img");
  const myCard1Name = document.getElementById("card_1_name");
  const myCard2Name = document.getElementById("card_2_name");
  const myCard3Name = document.getElementById("card_3_name");

  let clickedCards = new Set();
  const loadingDiv = document.querySelector('.loader');
  const ageInput = document.getElementById('age');
  let userAge;


//DEFINE FUNCTIONS --------------------------------------------------------------
  
  function setSelectedCardsToBlankImage() {
    myCard1Div.innerHTML = "";
    myCard2Div.innerHTML = "";
    myCard3Div.innerHTML = "";
    myCard1Name.innerHTML = "";
    myCard2Name.innerHTML = "";
    myCard3Name.innerHTML = "";
    chosenCardImage1.src = "graphics/tarot_cards/cardblank.png";
    chosenCardImage2.src = "graphics/tarot_cards/cardblank.png";
    chosenCardImage3.src = "graphics/tarot_cards/cardblank.png";
    myCard1Div.appendChild(chosenCardImage1);
    myCard2Div.appendChild(chosenCardImage2);
    myCard3Div.appendChild(chosenCardImage3);
  }
  
  function removeCardElements({                
    genderInput = document.querySelector('input[name="gender"]:checked'), 
    container = document.getElementById("card-spread-container")
  }) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    clickedCards = new Set();
    ageInput.value = "";
    if (genderInput) {genderInput.checked = false;};
  }

  function resetElements(cards = document.getElementsByClassName("card"), clickedCards) {
    const cardNames = document.getElementsByClassName("name")
    const cardNamesClicked = document.getElementsByClassName("clicked_card_name")
    for (let i = 0; i < tarotDeck.length; i++) {
      if (cardNames[i]) {
        cardNames[i].innerHTML = "";
      }
      if (cardNamesClicked[i]) {
        cardNamesClicked.innerHTML = "";
      }
    }
    document.querySelectorAll('.name').forEach(function(element) {
      element.removeAttribute('id');
    });
    for (let i = 0; i < tarotDeck.length; i++) {
      cards[i].classList.remove("selected");
      cards[i].classList.remove("in-myCardDiv");
      cards[i].classList.remove("click");
      cards[i].style.pointerEvents = "auto";
    }
  }

  function shuffleFunction(array) {
    // Use the Fisher-Yates shuffle algorithm
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createCardBoxes({
    cards = document.getElementsByClassName("card"), 
    container = document.getElementById("card-spread-container"), 
    myCard1Div = document.getElementById("card_1"), 
    myCard2Div = document.getElementById("card_2"), 
    myCard3Div = document.getElementById("card_3"),
    tarotReading = document.getElementById("tarot-reading"),
    counter = 0
  }){
    for (let i = 0; i < tarotDeck.length; i++) {

      // Create a div for each card and assign it to a grid area
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.dataset.gridArea = i+1;

      // Create an img element for the back of the card
      const cardImage = document.createElement("img");
      cardImage.src = "graphics/tarot_cards/back1.jpg";
      cardDiv.appendChild(cardImage);

      // Create a card name element
      const cardName = document.createElement("div");
      cardName.classList = "name";
      cardDiv.appendChild(cardName);

      // Append each card div to the container
      container.classList.add("card-spread-container");
      container.appendChild(cardDiv);

      cardDiv.onclick = function() {
        // Set ID's for clicked cards
        cardImage.setAttribute("id","clicked_card");
        cardName.setAttribute("id","clicked_card_name");
        cardImage.classList.toggle("click");

        if (counter < 3) {

          // If card has already been clicked, do not continue
          if (clickedCards.has(i)) {return;};

          // Store the card that has been clicked in clickedCards
          clickedCards.add(i);

          // When a card is clicked, show the front of the card for max 3 cards.
          switch (counter) {

            // First Click
            case 0:
              cardImage.src = "graphics/tarot_cards/" + tarotDeck[i] + ".png";
              cardName.innerHTML = "<h3>" + tarotDeck[i] + "</h3>";
              chosenCardImage1.src = "graphics/tarot_cards/" + tarotDeck[i] + ".png";
              chosenCardImage1.classList.add("in-myCardDiv");
              myCard1Name.innerHTML = cardName.innerHTML;
              counter++;
              break;

            // Second Click
            case 1:
              cardImage.src = "graphics/tarot_cards/" + tarotDeck[i] + ".png";
              cardName.innerHTML = "<h3>" + tarotDeck[i] + "</h3>";
              chosenCardImage2.src = "graphics/tarot_cards/" + tarotDeck[i] + ".png";
              chosenCardImage2.classList.add("in-myCardDiv");
              myCard2Name.innerHTML = cardName.innerHTML;
              counter++;
              break;

            // Third Click
            case 2:;
              cardImage.src = "graphics/tarot_cards/" + tarotDeck[i] + ".png";
              cardName.innerHTML = "<h3>" + tarotDeck[i] + "</h3>";
              chosenCardImage3.src = "graphics/tarot_cards/" + tarotDeck[i] + ".png";
              chosenCardImage3.classList.add("in-myCardDiv");
              myCard3Name.innerHTML = cardName.innerHTML;
              counter++;
              break;
          }
        } else {
          return;
        }
      }
    }
  }  


//SHUFFLE ANIMATION -------------------------------------------------------------

  function shuffleAnimation({
    newRandomPositions = [],
    cards = document.getElementsByClassName("card"),
    mainApp = document.getElementById("main-app")
  }) {
  // Calculate new random positions and final grid area for each card
    for (let i = 0; i < cards.length; i++) {
      let newLeft = Math.floor(Math.random() * (mainApp.getBoundingClientRect().left - cards[i].getBoundingClientRect().left));
      let newTop = Math.floor(Math.random() * (mainApp.getBoundingClientRect().top - cards[i].getBoundingClientRect().top));
      newRandomPositions.push({ left: newLeft, top: newTop });
    }
  // Animate the cards moving to the new random positions
    for (let i = 0; i < cards.length; i++) {
      if (!clickedCards.has(i)) {
        cards[i].style.transition = "all 0.5s ease-in-out"
        anime({
          targets: cards[i],
          translateX: newRandomPositions[i].left,
          translateY: newRandomPositions[i].top,
          duration: 500,
          easing: 'easeOutExpo'
        })
      }
    }
  }
      
  function animateBackInPlace(cards = document.getElementsByClassName("card")) {
      for (let i = 0; i < cards.length; i++) {
        anime({
          targets: cards[i],
          translateX: 0,
          translateY: 0,
          duration: 1000,
          easing: 'easeOutExpo'
        });
      }
    }


//DEFINE EVENT LISTENERS --------------------------------------------------------

  shuffleButton.addEventListener("click", (clickedCardImage = document.getElementsByClassName("click"), clickedCards) => {
    shuffleAnimation({clickedCards});
    for (let i=0;i<clickedCardImage.length;i++) {
      clickedCardImage[i].src = "graphics/tarot_cards/back.png";
    }
    shuffleFunction(tarotDeck);
    setTimeout(function(){
      shuffleFunction(tarotDeck);
      setTimeout(function(){shuffleAnimation({});}, 1000);
      setTimeout(function(){shuffleAnimation({});}, 1000);
      setTimeout(function(){shuffleAnimation({});}, 1000);
      setTimeout(function(){animateBackInPlace();}, 2000);
    }, 500);
    resetElements();
  });

  resetButton.addEventListener("click", () => {
    tl = new TimelineMax()
    const container = document.getElementById("card-spread-container");
    tl.to(container, 0.5, {opacity: 0, onComplete: () => {
      // Clear the text content of results
      document.getElementById("tarot-reading").innerHTML = "";
      shuffleFunction(tarotDeck);
      resetElements();
      removeCardElements({});
      setSelectedCardsToBlankImage();
      createCardBoxes({clickedCards,tarotDeck});
      loadingDiv.style.display = 'none';
      sendButton.style.display = 'block'
      tl.to([container,myCard1Div,myCard2Div,myCard3Div], 0.5, {opacity: 1});
    }});
  });

  ageInput.addEventListener("input", function(){
      userAge = ageInput.value
  });

  // Call to node.js project to make the API call
  sendButton.addEventListener("click", () => { 
    if(!userAge){
      alert("Age is required")
      return;
    }
    let gender = document.querySelector('input[name="gender"]:checked');
    if(!gender){
      alert("Gender is required")
      return;
    }
    gender = document.querySelector('input[name="gender"]:checked').value;
    const tarotReading = document.getElementById("tarot-reading");
    sendButton.style.display = "none"
    const loadingDiv = document.querySelector('.loader');
    loadingDiv.style.display = "block";
    axios.post("http://localhost:3000/api/generate_reading", { 
      age: userAge, 
      gender: gender, 
      finalCards: myCard1Name.textContent + ", " + myCard2Name.textContent + ", " + myCard3Name.textContent + "."
    })
    .then(response => {
      tarotReading.innerHTML += response.data;
      loadingDiv.style.display = 'none';
      sendButton.style.display = 'block'
    })
    .catch(error => {
      console.log(error);
      loadingDiv.style.display = 'none';
      sendButton.style.display = 'block'
      tarotReading.innerHTML = "Error: " + error;
    });
  });

//ON WINDOW LOAD ----------------------------------------------------------------

  window.onload = function() {
    loadingDiv.style.display = 'none';
    shuffleFunction(tarotDeck);
    createCardBoxes({tarotDeck});
    setSelectedCardsToBlankImage();
    }
