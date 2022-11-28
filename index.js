const puppeteer = require("puppeteer");
const infos = {
  email: "allisson.neo@corebiz.ag",
  password: "@AllissonNeo321",
  link: "https://cartersarg.myvtex.com",
};

const robo = async (c) => {
    process.setMaxListeners(0);
    console.log("Loading... ");

    const browser = await puppeteer.launch({
      headless: false,
      executablePath: "google-chrome",
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 920 });
    await page.goto(
      "https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"
    );

    await page.waitFor("#identifierId");
    await page.type("#identifierId", infos.email, { delay: 200 });
    await page.keyboard.press("Enter");

    await page.waitFor('[type="password"]');
    await page.waitForTimeout(1500);
    await page.type('[type="password"]', infos.password, { delay: 200 });
    await page.keyboard.press("Enter");

    await page.waitForTimeout(6000);
    await page.waitFor(".XY0ASe");
    await page.goto(
      `${infos.link}/admin/message-center/#/templates?page=1&per_page=113`
    );

    await page.waitFor('iframe[data-testid="admin-iframe-container"]');
    await page.goto(
      `${infos.link}/admin/iframe/message-center/#/templates?page=1&per_page=113`
    );

    await page.waitFor(".card.span3.ng-scope");
    const cards = await page.$$(".card.span3.ng-scope");
    console.log("", cards.length);
    var getdata = [];
    for (let i = 0; i < cards.length; i++) {
      await page.waitForTimeout(500);
      cards[i].click();
      await page.waitForTimeout(500);
      await page.waitFor(".pull-left.editable.ng-binding");
      await page.waitFor(".card.span3.ng-scope");

      const data = await page.evaluate(async () => {
        const name = document.querySelector(
            ".pull-left.editable.ng-binding"
          ).innerText,
          isActive = document.querySelectorAll(
            ".form-horizontal .control-group.span3 label.checkbox input[type=checkbox].ng-pristine.ng-valid"
          )[0].checked,
          url = document.location.href.replace("/iframe", "");
        return {
          name: name,
          url: url,
          isActive: isActive,
        };
      });
      getdata.push({
        name: data.name,
        url: data.url,
        isActive: data.isActive,
      });
      console.log("Cards Data", getdata);

      await page.goto(
        `${infos.link}/admin/iframe/message-center/#/templates?page=1&per_page=113`
      );
      await page.waitFor(".card.span3.ng-scope");
      console.log("Loading ......" + i);
    }

    const fs = require("fs");

    let text = ``;

    for (let i = 0; i < getdata.length; i++) {
        text += `[${getdata[i].isActive ? "active" : "disabled"}] ${getdata[i].name} - ${getdata[i].url} \n\n`;
    }

    fs.writeFile(`./activos.txt`, text, function (err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
    });

    console.log("TEEXT", text);
    await browser.close();
  },
  callRobo = () => {
    robo(2);
  };
callRobo();
