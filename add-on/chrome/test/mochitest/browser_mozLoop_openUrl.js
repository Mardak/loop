/* Any copyright is dedicated to the Public Domain.
   http://creativecommons.org/publicdomain/zero/1.0/ */

/*
 * This file contains tests for various context-in-conversations helpers in
 * LoopUI and Loop API.
 */
"use strict";

var [, gHandlers] = LoopAPI.inspect();

function promiseOpenURL(url, where) {
  let message = { data: [url, where] };
  return new Promise(resolve => gHandlers.OpenURL(message, resolve));
}

function getLocation(tab) {
  return ContentTask.spawn(tab.linkedBrowser, null, () => content.location.href);
}

add_task(function* test_mozLoop_openUrl_implicit() {
  yield promiseOpenURL("about:");

  let tab = gBrowser.selectedTab;
  let location = yield getLocation(tab);
  Assert.strictEqual(location, "about:", "url should match in implicit tab");
  yield BrowserTestUtils.removeTab(tab);
});

add_task(function* test_mozLoop_openUrl_tab() {
  yield promiseOpenURL("about:about", "tab");

  let tab = gBrowser.selectedTab;
  let location = yield getLocation(tab);
  Assert.strictEqual(location, "about:about", "url should match in tab");
  yield BrowserTestUtils.removeTab(tab);
});

add_task(function* test_mozLoop_openUrl_window() {
  let winPromise = new Promise(resolve => {
    Services.ww.registerNotification(function onNotify(win, topic) {
      if (topic == "domwindowopened") {
        Services.ww.unregisterNotification(onNotify);
        win.addEventListener("load", function onLoad() {
          win.removeEventListener("load", onLoad);
          resolve(win);
        });
      }
    });
  });

  yield promiseOpenURL("about:blank", "window");
  let win = yield winPromise;
  let tab = win.gBrowser.selectedTab;
  let location = yield getLocation(tab);
  Assert.strictEqual(location, "about:blank", "url should match in window");
  yield BrowserTestUtils.removeTab(tab);
  win.close();
});
