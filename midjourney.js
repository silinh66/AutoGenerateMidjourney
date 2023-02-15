const delay = require("delay");
const fs = require("fs");
const puppeteer = require("puppeteer-extra");
const axios = require("axios");
var timeout = 200000;
puppeteer.use(require("puppeteer-extra-plugin-anonymize-ua")());

async function run() {
  let listPromptSource = await fs.readFileSync("listPrompt.txt", "utf8");
  let listPrompt = listPromptSource.split("\n");
  const ws =
    "ws://127.0.0.1:9222/devtools/browser/9b326dfd-84bc-4240-8bd3-d08118fc6869";
  // const browser = await puppeteer.launch({
  //   headless: false,
  //   // args: [
  //   //   "--user-data-dir=C:/Users/HP/AppData/Local/Google/Chrome/User Data/Profile 25",
  //   //   // '--user-data-dir="C:\\Users\\HP\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 25"',
  //   // ],
  // });
  const browser = await puppeteer.connect({
    headless: true,
    browserWSEndpoint: ws,
    defaultViewport: null,
  });

  await delay(2000);
  const page = await browser.newPage();
  const ua =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36";
  await page.setUserAgent(ua);

  await page.goto(
    "https://discord.com/channels/1073602024379256852/1073602436742266900"
  );
  await delay(2000);
  try {
    for (let i = 0; i < listPrompt.length; i++) {
      let prompt = listPrompt[i];
      fs.writeFileSync("listPrompt.txt", listPrompt.slice(i + 1).join("\n"));

      await page.waitForSelector(".attachButton-_ACFSu");
      await delay(2000);
      await page.evaluate(() => {
        document.querySelector(".attachButton-_ACFSu").click();
      });
      await delay(2000);
      await page.waitForSelector(
        "#channel-attach-SLASH_COMMAND > div > div > div"
      );
      await delay(2000);
      await page.evaluate(() => {
        document
          .querySelector("#channel-attach-SLASH_COMMAND > div > div > div")
          .click();
      });
      await delay(2000);
      await page.waitForSelector(
        "#autocomplete-0 > div > div > div.infoWrapper-33i2RS > div.usageWrapper-2eaALZ"
      );

      await page.evaluate(() => {
        document
          .querySelector(
            "#autocomplete-0 > div > div > div.infoWrapper-33i2RS > div.usageWrapper-2eaALZ"
          )
          .click();
      });
      await delay(1000);
      await page.waitForSelector(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > div > div > div.chat-2ZfjoI > div > main > form > div > div.scrollableContainer-15eg7h.webkit-QgSAqd.hasConnectedBar-1vN2JH > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div > div > span.inlineElement-J_g2AS.optionPill-2kmuZR.selectedPill-3cOyS6 > span.optionPillValue-2uxsMp"
      );
      await page.type(
        "#app-mount > div.appAsidePanelWrapper-ev4hlp > div.notAppAsidePanel-3yzkgB > div.app-3xd6d0 > div > div.layers-OrUESM.layers-1YQhyW > div > div > div > div > div.chat-2ZfjoI > div > main > form > div > div.scrollableContainer-15eg7h.webkit-QgSAqd.hasConnectedBar-1vN2JH > div > div.textArea-2CLwUE.textAreaSlate-9-y-k2.slateContainer-3x9zil > div > div > div > span.inlineElement-J_g2AS.optionPill-2kmuZR.selectedPill-3cOyS6 > span.optionPillValue-2uxsMp",
        prompt
      );

      await page.keyboard.press("Enter");

      await delay(60 * 1000);
    }
  } catch (error) {
    console.log("error: ", error);
    run();
  }
}

run();
