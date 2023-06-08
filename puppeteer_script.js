const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the Chipotle tweet URL
  await page.goto('https://twitter.com/ChipotleTweets/status/1234567890');

  // Extract the code from the tweet's body
  const codeElement = await page.$('.tweet-body .code');
  const code = await page.evaluate(element => element.textContent, codeElement);

  // Close the browser
  await browser.close();

  // Open iMessage
  // Assuming iMessage is already open and the conversation with 888-222 is active

  // Copy the code to the clipboard
  const { exec } = require('child_process');
  exec(`echo "${code}" | pbcopy`); // macOS command to copy text to the clipboard

  // Send the code via iMessage
  exec(`osascript -e 'tell application "Messages" to send "${code}" to buddy "888-222"'`); // macOS command to send iMessage

})();
