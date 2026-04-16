const { chromium } = require("playwright");
const sharp = require("sharp");

const URL = "https://asifsamir.com";

// 👇 change these freely while testing
let x = 0;
let y = 220;
let width = 1280;
let height = 400;

(async () => {
  const browser = await chromium.launch({ headless: false }); // 👈 visible browser
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto(URL, { waitUntil: "networkidle" });

  await page.waitForTimeout(1500); // let animations settle

  await page.screenshot({ path: "full.png", fullPage: false });

  await browser.close();

  await sharp("full.png")
    .extract({ left: x, top: y, width, height })
    .toFile("landing.png");

  console.log("Saved landing.png");
})();
