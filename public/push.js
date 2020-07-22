var webPush = require('web-push');

const vapidKeys = {
    "publicKey": "BCuKD3f72UD53I-WoS03Za3qA6w8DSxBwu0U8G2orEJAPOIJQoPkHBV_YcRiTmyC2wiaqrtKR-GZhePCw1Jku9I",
    "privateKey": "93vk-TM2k9mPqJgq2zE032U_McRYJb4F_QBvRGV4XKA"
};


webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/eVf-chPsLYk:APA91bHRBqGjt9Muiikr8MmWlYAaFJffu-JyV_EgzBLtJfPmkqBaVuIYM7sTh0I_N1BUN3m6UkAygIvKFT4o_c0dE4fk_Q56uLkbbgdDIAaO4rGMKU2F7Li5evjyFWmXg-5mAolnFyaq",
    "keys": {
        "p256dh": "BBIueEEQteyIGo05Rj3zkdGPqV5OsZPh2lqmQ3lLeBx+mVjJvtNiFjsEt/OpL0RI+cedQPCmh1eTgITYZ1zOTPY=",
        "auth": "JmcRefbpHvWNPnc4Oeml9g=="
    }
};
var payload = 'Aplikasi sudah dapat menerima push notifikasi';
var options = {
    gcmAPIKey: '470574049385',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);