cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-plugin-inappbrowser.inappbrowser",
    "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
    "pluginId": "cordova-plugin-inappbrowser",
    "clobbers": [
      "cordova.InAppBrowser.open",
      "window.open"
    ]
  },
  {
    "id": "cordova-plugin-streaming-media.StreamingMedia",
    "file": "plugins/cordova-plugin-streaming-media/www/StreamingMedia.js",
    "pluginId": "cordova-plugin-streaming-media",
    "clobbers": [
      "streamingMedia"
    ]
  },
  {
    "id": "cordova-plugin-dialogs.notification",
    "file": "plugins/cordova-plugin-dialogs/www/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  },
  {
    "id": "cordova-plugin-dialogs.notification_android",
    "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
    "pluginId": "cordova-plugin-dialogs",
    "merges": [
      "navigator.notification"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-inappbrowser": "3.0.0",
  "cordova-plugin-streaming-media": "2.1.1",
  "cordova-plugin-whitelist": "1.3.3",
  "cordova-plugin-dialogs": "2.0.1"
};
// BOTTOM OF METADATA
});