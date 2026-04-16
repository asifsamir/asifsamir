const { chromium } = require("playwright");

const URL = "https://asifsamir.com";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Keep viewport stable (VERY important for consistent cropping)
  await page.setViewportSize({ width: 1280, height: 800 });

  await page.goto(URL, { waitUntil: "networkidle" });

  await page.waitForTimeout(1500);

  // Optional: ensure page is fully rendered
  await page.waitForLoadState("networkidle");

  // Screenshot with manual crop (clip region)
  await page.screenshot({
    path: "landing.png",
    clip: {
      x: 0,        // horizontal start
      y: 200,      // vertical offset (top cut)
      width: 1280, // crop width
      height: 450  // crop height (hero slice)
    }
  });

  await browser.close();

  console.log("✅ Cropped screenshot saved as landing.png");
})();
