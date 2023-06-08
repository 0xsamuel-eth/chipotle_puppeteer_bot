const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the Chipotle tweet URL
  await page.goto('https://twitter.com/ChipotleTweets/status/1234567890');

  // Extract the image URL from the tweet's body
  const imageElement = await page.$('.tweet-body img');
  const imageUrl = await page.evaluate(element => element.src, imageElement);

  // Close the browser
  await browser.close();

  // Perform OCR on the image URL using Tesseract.js
  const { data: { text } } = await Tesseract.recognize(imageUrl);

  // Extract the code from the OCR result
  const codeMatch = text.match(/(?<=text\s)\S+/);
  const code = codeMatch ? codeMatch[0] : '';

  // Open iMessage
  // Assuming iMessage is already open and the conversation with 888-222 is active

  // Copy the code to the clipboard
  const { exec } = require('child_process');
  exec(`echo "${code}" | pbcopy`); // macOS command to copy text to the clipboard

  // Send the code via iMessage
  exec(`osascript -e 'tell application "Messages" to send "${code}" to buddy "888-222"'`); // macOS command to send iMessage

})();
