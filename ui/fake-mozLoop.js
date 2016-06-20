/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// Sample from https://wiki.mozilla.org/Loop/Architecture/Rooms#GET_.2Frooms
var fakeRooms = [
  {
    "roomToken": "_nxD4V4FflQ",
    "decryptedContext": {
      "roomName": "First Room Name",
      "urls": [{
        description: "The mozilla page",
        location: "https://www.mozilla.org",
        thumbnail: "https://www.mozilla.org/favicon.ico"
      }]
    },
    "roomUrl": "http://localhost:3000/rooms/_nxD4V4FflQ",
    "maxSize": 2,
    "creationTime": 1405517546,
    "ctime": 1405517546,
    "expiresAt": 1405534180,
    "participants": []
  },
  {
    "roomToken": "QzBbvGmIZWU",
    "decryptedContext": {
      "roomName": "Second Room Name"
    },
    "roomUrl": "http://localhost:3000/rooms/QzBbvGmIZWU",
    "maxSize": 2,
    "creationTime": 1405517546,
    "ctime": 1405517546,
    "expiresAt": 1405534180,
    "participants": []
  },
  {
    "roomToken": "3jKS_Els9IU",
    "decryptedContext": {
      "roomName": "UX Discussion"
    },
    "roomUrl": "http://localhost:3000/rooms/3jKS_Els9IU",
    "maxSize": 2,
    "clientMaxSize": 2,
    "creationTime": 1405517546,
    "ctime": 1405517818,
    "expiresAt": 1405534180,
    "participants": [
       { "displayName": "Alexis", "account": "alexis@example.com", "roomConnectionId": "2a1787a6-4a73-43b5-ae3e-906ec1e763cb" },
       { "displayName": "Adam", "roomConnectionId": "781f012b-f1ea-4ce1-9105-7cfc36fb4ec7" }
     ]
  },
  {
    "roomToken": "REJRFfkdfkf",
    "decryptedContext": {
      "roomName": "Third Room Name"
    },
    "roomUrl": "http://localhost:3000/rooms/REJRFfkdfkf",
    "roomOwner": "Alexis",
    "maxSize": 2,
    "creationTime": 1405537485,
    "ctime": 1405537485,
    "expiresAt": 1405554180,
    "participants": []
  },
  {
    "roomToken": "fjdkreFJDer",
    "decryptedContext": {
      "roomName": "Fourth Room Name"
    },
    "roomUrl": "http://localhost:3000/rooms/fjdkreFJDer",
    "roomOwner": "Alexis",
    "maxSize": 2,
    "creationTime": 1405546564,
    "ctime": 1405546564,
    "expiresAt": 1405564180,
    "participants": []
  },
  {
    "roomToken": "preFDREJhdf",
    "decryptedContext": {
      "roomName": "Fifth Room Name"
    },
    "roomUrl": "http://localhost:3000/rooms/preFDREJhdf",
    "roomOwner": "Alexis",
    "maxSize": 2,
    "creationTime": 1405566934,
    "ctime": 1405566934,
    "expiresAt": 1405584180,
    "participants": []
  },
  {
    "roomToken": "preFLighdf",
    "decryptedContext": {
      "roomName": "Sixth Room Name is a little longer to check the ellipsis"
    },
    "roomUrl": "http://localhost:3000/rooms/preFLighdf",
    "roomOwner": "Alexis",
    "maxSize": 2,
    "creationTime": 1405576934,
    "ctime": 1405576934,
    "expiresAt": 1405614180,
    "participants": []
  },
  {
    "roomToken": "preFLighdfso",
    "decryptedContext": {
      "roomName": "",
      "urls": [
        {
          "description": "Page Title as Room Name",
          "location": "http://mozilla.com"
        }
      ]
    },
    "roomUrl": "http://localhost:3000/rooms/preFLighdfso",
    "roomOwner": "Alexis",
    "maxSize": 2,
    "creationTime": 1405576934,
    "ctime": 1405576934,
    "expiresAt": 1405614180,
    "participants": []
  },
  {
    "roomToken": "preFLighdfsi",
    "decryptedContext": {
      "roomName": "",
      "urls": [{
          "description": "",
          "location": "http://mozilla.com/Url_As_Room_Name"
        }]
    },
    "roomUrl": "http://localhost:3000/rooms/preFLighdfsi",
    "roomOwner": "Alexis",
    "maxSize": 2,
    "creationTime": 1405576934,
    "ctime": 1405576934,
    "expiresAt": 1405614180,
    "participants": []
  }
];

(function() {
  "use strict";

  /**
   * Faking the mozLoop object which doesn't exist in regular web pages.
   * @type {Object}
   */
  LoopMochaUtils.stubLoopRequest({
    EnsureRegistered() {},
    GetAudioBlob() {
      return new Blob([new ArrayBuffer(10)], { type: "audio/ogg" });
    },
    GetDoNotDisturb() { return true; },
    GetErrors() {},
    GetLoopPref(pref) {
      switch (pref) {
        // Ensure we skip FTE completely if FTU_VERSION = 1.
        case "gettingStarted.latestFTUVersion":
          return 1;
        case "facebook.enabled":
          return true;
      }
      return null;
    },
    HasEncryptionKey: true,
    SetLoopPref() {},
    CopyString() {},
    GetSelectedTabMetadata() {
      return {
        previews: ["chrome://branding/content/about-logo.png"],
        description: "sample webpage description",
        url: "https://www.example.com"
      };
    },
    "Rooms:GetAll"() {
      return [].concat(fakeRooms);
    },
    GetUserProfile() { return null; },
    "Rooms:PushSubscription"() {}
  });

  loop.storedRequests = {
    GetHasEncryptionKey: true,
    GetUserProfile: null,
    GetDoNotDisturb: true,
    // Ensure we skip FTE completely.
    "GetLoopPref|gettingStarted.latestFTUVersion": 2,
    "GetLoopPref|legal.ToS_url": null,
    "GetLoopPref|legal.privacy_url": null,
    IsMultiProcessActive: false
  };
})();
