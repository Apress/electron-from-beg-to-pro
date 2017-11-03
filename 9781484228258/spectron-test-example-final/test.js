var electron = require('electron');
var Application = require('spectron').Application;
var expect = require('chai').expect;
var path = require('path');

const baseDir = path.resolve(__dirname);

describe('SPECTRON EXAMPLE', function describeWrap() {
  this.timeout(10000);
  global.app = null;

  before(() => {
    app = new Application({
      path: electron,
      args: ['.'],
    });
    return app.start()
              .then(() => {
                app.client.waitUntilWindowLoaded()
                  // app.browserWindow.show();
                  return app;
                });
  });

  after(() => {
    if(app && app.isRunning()) {
      return app.stop();
    }
  });

  it('should open a window', () => {
    return app.client.waitUntilWindowLoaded()
          .getWindowCount()
            .then( (count) => {
              expect(count).to.equal(1);
            });
  });

  it('should open a working window', () => {
    return app.client.waitUntilWindowLoaded()
            .browserWindow.isVisible()
              .then((res) => {
                expect(res).to.be.true;
              })
            .browserWindow.isFocused()
              .then((res) => {
                expect(res).to.be.true;
              })
            .browserWindow.isMinimized()
              .then( (res) => {
                expect(res).to.be.false;
              })
            .browserWindow.isDevToolsOpened()
              .then((res) => {
                expect(res).to.be.false;
              });
  });

  it('should open a window to correct size', () => {
    return app.client.waitUntilWindowLoaded()
               .browserWindow.getBounds()
                .then((res) => {
                  expect(res.width).to.equal(800);
                  expect(res.height).to.equal(600);
                });

  });

  it('should call foobar', () => {
    return app.client.waitUntilWindowLoaded()
                      .then(() => {
                        return app.client.getText('#foobarButton')
                      })
                      .then((text) => {
                        expect(text).to.equal('Get Foobar');
                        return app.client.click('#foobarButton');
                      })
                      .then(() => {
                        return app.client.getText('#foobarButton');
                      })
                      .then((text) => {
                        expect(text).to.equal('hello!');
                      });
  });

});
