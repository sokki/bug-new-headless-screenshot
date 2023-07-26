import puppeteer from "puppeteer";
import lighthouse from "lighthouse";
import * as fs from "fs";

async function screenshot(headless) {
    const chrome = await puppeteer.launch({
        headless,
    });

    const endpoint = chrome.wsEndpoint();
    const endpointURL = new URL(endpoint);
    const options = {
        output: "html",
        onlyCategories: ["performance"],
        port: Number(endpointURL.port),
    };
    const runnerResult = await lighthouse("https://example.com", options);

    const reportHtml = runnerResult.report;
    fs.writeFileSync(
        `report-headless_${headless}-${Date.now()}.html`,
        reportHtml
    );

    await chrome.close();
}

async function run() {
    await screenshot(true);
    await screenshot("new");
}

run();
