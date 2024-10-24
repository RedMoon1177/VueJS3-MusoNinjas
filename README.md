# VueJS3-MusoNinjas

All credit goes to https://www.udemy.com/course/build-web-apps-with-vuejs-firebase

**BACKEND**: https://console.firebase.google.com/

**DATABASE**:

1. Data Collections (text-based): **Cloud Firestore** (Firestore Database)

2. Folders/ Images/ Videos: **Firebase Storage**

**Firestore rules**

Make sure you’ve published the Firestore rules.
If you’ve edited the rules but haven’t deployed them, they won’t take effect.
To publish the rules, run the following command:

firebase deploy --only firestore:rules

**Storage rules**
you need to publish your storage.rules as well, just like the Firestore rules.
Firebase Storage security rules do not automatically apply when you edit them locally;
you must deploy them to make the changes take effect.

firebase deploy --only storage
