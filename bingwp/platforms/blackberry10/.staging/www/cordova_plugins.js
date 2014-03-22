cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.blackberry.app/www/client.js",
        "id": "com.blackberry.app.client",
        "clobbers": [
            "blackberry.app"
        ]
    },
    {
        "file": "plugins/com.blackberry.system/www/client.js",
        "id": "com.blackberry.system.client",
        "clobbers": [
            "blackberry.system"
        ]
    },
    {
        "file": "plugins/com.blackberry.invoke/www/client.js",
        "id": "com.blackberry.invoke.client",
        "clobbers": [
            "blackberry.invoke"
        ]
    },
    {
        "file": "plugins/com.blackberry.io/www/client.js",
        "id": "com.blackberry.io.client",
        "clobbers": [
            "blackberry.io"
        ]
    },
    {
        "file": "plugins/com.blackberry.io.filetransfer/www/client.js",
        "id": "com.blackberry.io.filetransfer.client",
        "clobbers": [
            "blackberry.io.filetransfer"
        ]
    },
    {
        "file": "plugins/com.blackberry.community.clipboard/www/client.js",
        "id": "com.blackberry.community.clipboard.client",
        "clobbers": [
            "community.clipboard"
        ]
    },
    {
        "file": "plugins/com.blackberry.invoke.card/www/client.js",
        "id": "com.blackberry.invoke.card.client",
        "clobbers": [
            "blackberry.invoke.card"
        ]
    },
    {
        "file": "plugins/com.blackberry.ui.toast/www/client.js",
        "id": "com.blackberry.ui.toast.client",
        "clobbers": [
            "blackberry.ui.toast"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.blackberry.app": "1.0.0",
    "com.blackberry.system": "1.0.0",
    "com.blackberry.invoke": "1.0.0",
    "com.blackberry.io": "1.0.0",
    "com.blackberry.io.filetransfer": "1.0.0",
    "com.blackberry.community.clipboard": "1.0.0",
    "com.blackberry.invoke.card": "1.0.0",
    "com.blackberry.ui.toast": "1.0.0",
    "com.blackberry.utils": "1.0.0",
    "com.blackberry.jpps": "1.0.0"
}
// BOTTOM OF METADATA
});