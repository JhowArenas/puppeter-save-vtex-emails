const puppeteer = require('puppeteer')
const infos = { email: 'email@gmail.com', password: 'gmail_password', link: 'https://YOUR_DOMAIN.myvtex.com' };

const robo = async (c) => {
    process.setMaxListeners(0)
    console.log('Loading... ')

    const browser = await puppeteer.launch({
        headless: false,
        executablePath: 'google-chrome'
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1024, height: 920 });
    await page.goto('https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin')

    await page.waitFor('#identifierId')
    await page.type('#identifierId', infos.email, { delay: 200 })
    await page.keyboard.press('Enter')

    await page.waitFor('[type="password"]')
    await page.waitForTimeout(1500)
    await page.type('[type="password"]', infos.password, { delay: 200 })
    await page.keyboard.press('Enter')

    await page.waitFor('.x7WrMb')
    await page.goto(`${infos.link}/admin/message-center/#/templates?page=1&per_page=109`);

    await page.waitFor('iframe[data-testid="admin-iframe-container"]')
    await page.goto(`${infos.link}/admin/iframe/message-center/#/templates?page=1&per_page=109`)

    await page.waitFor('.card.span3.ng-scope')
    const cards = await page.$$('.card.span3.ng-scope')

    var getdata = [];
    for (let i = 0; i < cards.length; i++) {
        cards[i].click()
        await page.waitForTimeout(1000)
        await page.waitFor('.pull-left.editable.ng-binding')
        await page.waitFor('.card.span3.ng-scope')

        const data = await page.evaluate(async () => {
            const name = document.querySelector('.pull-left.editable.ng-binding').innerText;
            const emailTitle = document.querySelector('#email-title').value;
            const url = document.location.href.replace('/iframe', '');
            const email = document.getElementById('preview-message');

            return {
                name: name,
                title: emailTitle,
                url: url,
                email: email.contentDocument.documentElement.outerHTML.replaceAll(/\n/g, '')
            }
        })
        getdata.push({
            name: data.name,
            title: data.title,
            url: data.url,
            email: data.email
        })
        // console.log('Cards Data', getdata)

        await page.goto(`${infos.link}/admin/iframe/message-center/#/templates?page=1&per_page=109`)
        await page.waitFor('.card.span3.ng-scope')

    }
    // console.log('Cards Data', getdata.length, getdata)

    const fs = require("fs")
    fs.mkdir(`./emails`, function (err) {
        if (err) {
            console.log(err)
        } else {
            consosle.log("New directory successfully created.")
        }
    })

    for (let i = 0; i < getdata.length; i++) {
        fs.mkdir(`./emails/${i + 1} - ${getdata[i].name}`, function (err) {
            if (err) {
                console.log(err)
            } else {
                consosle.log("New directory successfully created.")
            }
        })

        let text = `
            - Título: ${getdata[i].name}

            - Título del mensaje: ${getdata[i].title}
            
            - Link: ${getdata[i].url}
        `;

        fs.writeFile(`./emails/${i + 1} - ${getdata[i].name}/info.txt`, text, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });

        fs.writeFile(`./emails/${i + 1} - ${getdata[i].name}/email.html`, getdata[i].email, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
    // await page.screenshot({ path: 'ss/' + c + '.png' });

    // console.log('Printado', teste);
    await browser.close();
}, callRobo = () => {
    robo(2);
};
callRobo()