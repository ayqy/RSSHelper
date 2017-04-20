# RSSHelper

An Ionic project for fetching excellent technical blogs.

## Dependencies

### dev

`node@4.6.2` or older version is required, `node@7.x` is **not suggested**.

global packages:

    npm install -g ionic@1.7.16
    npm install -g cordova@6.2.0

local packages:

    cd <path/to>RSSHelper/src/RSSHelper
    npm install

And then start ionic server:

    cd <path/to>RSSHelper/src/RSSHelper
    ionic serve

### build

JAVA:

-  JDK@1.8.x

  Attention: JDK1.7 or older will cause a cordova error and **fail to build**.

Android:

-  Android SDK@23

Env variables(Windows):

    Path        D:\jdk\bin;D:\Android\sdk\tools;D:\Android\sdk\platform-tools
    JAVA_HOME   D:\jdk

#### build android

ref: <http://www.ayqy.net/blog/ionic%E5%BC%80%E5%8F%91%E8%B7%A8%E5%B9%B3%E5%8F%B0app%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98/#articleHeader9>

##### 1.create keystore

    cd <path/to>RSSHelper/src/RSSHelper/platforms/android
    keytool -genkey -v -keystore RSSHelper.keystore -alias RSSHelper -keyalg RSA -keysize 2048 -validity 10000

##### 2.create `release-signing.properties` file

    cd <path/to>RSSHelper/src/RSSHelper/platforms/android
    vi release-signing.properties
    # content like this:
    storeFile=./RSSHelper.keystore
    keyAlias=RSSHelper

##### 3.add crosswalk

    cd <path/to>RSSHelper/src/RSSHelper
    ionic browser add crosswalk

Crosswalk is really necessary, there will be no splash and no list in the tab when build without it.

##### 4.add inappbrowser plugin

    cd <path/to>RSSHelper/src/RSSHelper
    cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git

Due to some quirks, install this plugin separately.

##### 5.build

    cd <path/to>RSSHelper/src/RSSHelper
    ionic build --release android

Then an apk file will be generated:

    <path/to>RSSHelper/src/RSSHelper/platforms/android/build/outputs/apk/android-release.apk

##  Reference page that may be helpful

1.  error occurred when build with crosswalk

  http://stackoverflow.com/questions/35063792/build-error-after-adding-crosswalk-plugin-to-a-cordova-android-project

2.  inappbrowser doesn't work

  http://stackoverflow.com/questions/17849338/phonegap-android-inappbrowser-not-working

