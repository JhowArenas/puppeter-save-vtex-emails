"use strict";

var puppeteer = require("puppeteer");

var infos = {
  email: "teste@gmail.com",
  password: "12231",
  link: "teste@myvtex.com"
};

var robo = function robo(c) {
  var browser, page, cards, getdata, i, data, fs, text, _i;

  return regeneratorRuntime.async(function robo$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          process.setMaxListeners(0);
          console.log("Loading... ");
          _context2.next = 4;
          return regeneratorRuntime.awrap(puppeteer.launch({
            headless: false,
            executablePath: "google-chrome"
          }));

        case 4:
          browser = _context2.sent;
          _context2.next = 7;
          return regeneratorRuntime.awrap(browser.newPage());

        case 7:
          page = _context2.sent;
          _context2.next = 10;
          return regeneratorRuntime.awrap(page.setViewport({
            width: 1024,
            height: 920
          }));

        case 10:
          _context2.next = 12;
          return regeneratorRuntime.awrap(page["goto"]("https://accounts.google.com/signin/v2/identifier?flowName=GlifWebSignIn&flowEntry=ServiceLogin"));

        case 12:
          _context2.next = 14;
          return regeneratorRuntime.awrap(page.waitFor("#identifierId"));

        case 14:
          _context2.next = 16;
          return regeneratorRuntime.awrap(page.type("#identifierId", infos.email, {
            delay: 200
          }));

        case 16:
          _context2.next = 18;
          return regeneratorRuntime.awrap(page.keyboard.press("Enter"));

        case 18:
          _context2.next = 20;
          return regeneratorRuntime.awrap(page.waitFor('[type="password"]'));

        case 20:
          _context2.next = 22;
          return regeneratorRuntime.awrap(page.waitForTimeout(1500));

        case 22:
          _context2.next = 24;
          return regeneratorRuntime.awrap(page.type('[type="password"]', infos.password, {
            delay: 200
          }));

        case 24:
          _context2.next = 26;
          return regeneratorRuntime.awrap(page.keyboard.press("Enter"));

        case 26:
          _context2.next = 28;
          return regeneratorRuntime.awrap(page.waitForTimeout(6000));

        case 28:
          _context2.next = 30;
          return regeneratorRuntime.awrap(page.waitFor(".XY0ASe"));

        case 30:
          _context2.next = 32;
          return regeneratorRuntime.awrap(page["goto"]("".concat(infos.link, "/admin/message-center/#/templates?page=1&per_page=113")));

        case 32:
          _context2.next = 34;
          return regeneratorRuntime.awrap(page.waitFor('iframe[data-testid="admin-iframe-container"]'));

        case 34:
          _context2.next = 36;
          return regeneratorRuntime.awrap(page["goto"]("".concat(infos.link, "/admin/iframe/message-center/#/templates?page=1&per_page=113")));

        case 36:
          _context2.next = 38;
          return regeneratorRuntime.awrap(page.waitFor(".card.span3.ng-scope"));

        case 38:
          _context2.next = 40;
          return regeneratorRuntime.awrap(page.$$(".card.span3.ng-scope"));

        case 40:
          cards = _context2.sent;
          console.log("", cards.length);
          getdata = [];
          i = 0;

        case 44:
          if (!(i < cards.length)) {
            _context2.next = 67;
            break;
          }

          _context2.next = 47;
          return regeneratorRuntime.awrap(page.waitForTimeout(500));

        case 47:
          cards[i].click();
          _context2.next = 50;
          return regeneratorRuntime.awrap(page.waitForTimeout(500));

        case 50:
          _context2.next = 52;
          return regeneratorRuntime.awrap(page.waitFor(".pull-left.editable.ng-binding"));

        case 52:
          _context2.next = 54;
          return regeneratorRuntime.awrap(page.waitFor(".card.span3.ng-scope"));

        case 54:
          _context2.next = 56;
          return regeneratorRuntime.awrap(page.evaluate(function _callee() {
            var name, isActive, url;
            return regeneratorRuntime.async(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    name = document.querySelector(".pull-left.editable.ng-binding").innerText, isActive = document.querySelectorAll(".form-horizontal .control-group.span3 label.checkbox input[type=checkbox].ng-pristine.ng-valid")[0].checked, url = document.location.href.replace("/iframe", "");
                    return _context.abrupt("return", {
                      name: name,
                      url: url,
                      isActive: isActive
                    });

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            });
          }));

        case 56:
          data = _context2.sent;
          getdata.push({
            name: data.name,
            url: data.url,
            isActive: data.isActive
          });
          console.log("Cards Data", getdata);
          _context2.next = 61;
          return regeneratorRuntime.awrap(page["goto"]("".concat(infos.link, "/admin/iframe/message-center/#/templates?page=1&per_page=113")));

        case 61:
          _context2.next = 63;
          return regeneratorRuntime.awrap(page.waitFor(".card.span3.ng-scope"));

        case 63:
          console.log("Loading ......" + i);

        case 64:
          i++;
          _context2.next = 44;
          break;

        case 67:
          fs = require("fs");
          text = "";

          for (_i = 0; _i < getdata.length; _i++) {
            text += "[".concat(getdata[_i].isActive ? "active" : "disabled", "] ").concat(getdata[_i].name, " - ").concat(getdata[_i].url, " \n\n");
          }

          fs.writeFile("./activos.txt", text, function (err) {
            if (err) {
              return console.log(err);
            }

            console.log("The file was saved!");
          });
          console.log("TEEXT", text);
          _context2.next = 74;
          return regeneratorRuntime.awrap(browser.close());

        case 74:
        case "end":
          return _context2.stop();
      }
    }
  });
},
    callRobo = function callRobo() {
  robo(2);
};

callRobo();