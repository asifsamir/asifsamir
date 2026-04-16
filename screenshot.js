const { chromium } = require("playwright");

const URL = "https://asifsamir.com";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Fixed viewport (your requirement)
  await page.setViewportSize({
    width: 1280,
    height: 560
  });

  await page.goto(URL, {
    waitUntil: "networkidle"
  });

  await page.waitForTimeout(1500);

  await page.screenshot({
    path: "landing.png",
    fullPage: false
  });

  await browser.close();

  console.log("✅ Screenshot saved as landing.png");
})();
