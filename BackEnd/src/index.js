const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors({ origin: 'http://127.0.0.1:8080' }));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const port = 3000;
const key = require('key.js');

app.listen(port, () => {    
  console.log(`Server running on port ${port}`);
});

app.post("/api/generate_reading", async (req, res) => {
  const age = req.body.age
  const gender = req.body.gender
  const finalCards = req.body.finalCards;
  const reading = await sendToChatGPT(finalCards, age, gender);
  res.send(reading);
});

async function sendToChatGPT(finalCards, age, gender) {
  let prompt = 
  `I am a ${age} year old ${gender}, but don't include this in the response. 
  Provide me with a fictional tarot reading written by Mary K Greer, with the insights of James Ricklef and in the style of Rachel Pollack for the following 3 cards: ${finalCards} 
  Give a reading for each card first and then the overall reading. Provide an overall summary at the end, including warnings the cards may have given. 
  Card 1 Suggests: [Insert card 1 reading here]. 
  Card 2 Suggests: [Insert card 2 reading here]. 
  Card 3 Suggests: [Insert card 3 reading here].
  Overall Reading: [Insert overall reading here].
  Considerations: [Insert summary including warnings here].`;
  console.log(prompt);
  try {
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: key,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 3500,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    if (response.status !== 200) {
      throw new Error("API request failed with status code: " + response.status);
    }
    //let responsetosplit = response.data.choices[0].text;
    //let paragraphs = responsetosplit.split("Card").join("\n\nCard").split("Overall Reading").join("\n\nOverall Reading").split("Summary").join("\n\nSummary");
    //console.log(paragraphs);
    return response.data.choices[0].text;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


/*    let responsetosplit = response.data.choices[0].text;
    let parentDiv = document.getElementById("tarot-reading-box");
    let paragraphs = responsetosplit.split("Card").join("\n\nCard").split("Overall Reading").join("\n\nOverall Reading").split("Summary").join("\n\nSummary");
    let paragraphsArr = paragraphs.split("\n\n");

  for (let i = 0; i < paragraphsArr.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.innerHTML = paragraphsArr[i];
    parentDiv.appendChild(newDiv);
  }

  */