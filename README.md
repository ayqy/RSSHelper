# RSSHelper

An Ionic project for fetching excellent technical blogs.

## Dependencies

### Dev

`node@4.6.2` or lower version is required, `node@7.x` is **not suggested**.

global packages:

    npm install -g ionic@1.7.16
    npm install -g cordova@6.2.0

local packages:

    cd <path/to>RSSHelper/src/RSSHelper
    npm install

And then start ionic server:

    cd <path/to>RSSHelper/src/RSSHelper
    ionic serve

### Build

#### Build android

#####  0.Environment

JAVA:

-  JDK@1.8.x

  Attention: JDK1.7 or older will cause a cordova error and **fail to build**.

Android:

-  Android SDK@23

Env variables(Windows):

    Path        D:\jdk\bin;D:\Android\sdk\tools;D:\Android\sdk\platform-tools
    JAVA_HOME   D:\jdk

ref: <http://www.ayqy.net/blog/ionic%E5%BC%80%E5%8F%91%E8%B7%A8%E5%B9%B3%E5%8F%B0app%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98/#articleHeader9>

##### 1.Create keystore

    cd <path/to>RSSHelper/src/RSSHelper/platforms/android
    keytool -genkey -v -keystore RSSHelper.keystore -alias RSSHelper -keyalg RSA -keysize 2048 -validity 10000

##### 2.Create `release-signing.properties` file

    cd <path/to>RSSHelper/src/RSSHelper/platforms/android
    vi release-signing.properties
    # content like this:
    storeFile=./RSSHelper.keystore
    keyAlias=RSSHelper

##### 3.Add crosswalk

    cd <path/to>RSSHelper/src/RSSHelper
    ionic browser add crosswalk

Crosswalk is really necessary, there will be no splash and no list in the tab when build without it.

##### 4.Add inappbrowser plugin

    cd <path/to>RSSHelper/src/RSSHelper
    cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-inappbrowser.git

Due to some quirks, install this plugin separately.

#####  5.Add android platform

    ionic platform add android

##### 5.Build

    cd <path/to>RSSHelper/src/RSSHelper
    ionic build --release android

Then an apk file will be generated:

    <path/to>RSSHelper/src/RSSHelper/platforms/android/build/outputs/apk/android-release.apk

#### Build iOS

#####  0.Environment

-  OSX@10.12.x

  support building ios10.x, lower version for building ios9.x

-  Xcode@8.x

  support building ios10.x

  Xcode 7.x ONLY supports building ios9.x and lower

**Attention**: Xcode upgrading depends on the OSX upgrading, and can not install/update the Xcode form the appstore on OSX 10.9.

#####  1.Add ios platform & simulation

    npm install －g ios-sim
    cd <path/to>RSSHelper/src/RSSHelper
    ionic platform add ios

#####  2.Add inappbrowser plugin

the same as Build android step4.

#####  3.Build

    cd <path/to>RSSHelper/src/RSSHelper
    ionic build ios

#####  4.Simulate

    cd <path/to>RSSHelper/src/RSSHelper
    ionic emulate ios

An iOS simulator will start up and then open the app, and everything is fine.

#####  5.Install on the device

    cd <path/to>RSSHelper/src/RSSHelper/platforms/ios
    # Open RSSHelper.xcodeproj with Xcode
    # USB connect the device
    # Click Product>Destination>device name
    # Click the triangle button(Build and run the current scheme)

##  Reference page that may be helpful

1.  error occurred when build with crosswalk

  http://stackoverflow.com/questions/35063792/build-error-after-adding-crosswalk-plugin-to-a-cordova-android-project

2.  inappbrowser doesn't work

  http://stackoverflow.com/questions/17849338/phonegap-android-inappbrowser-not-working

