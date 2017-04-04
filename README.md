# RSSHelper

An Ionic project, 

## Dependencies

### dev

`node@4.6.2` or older version is required, `node@7.x` is **not suggested**.

global packages:

    npm install -g ionic@1.7.16
    npm install -g cordova@6.2.0

local packages:

    cd <path/to>RSSHelper\src\RSSHelper
    npm install

And then start ionic server:

    cd <path/to>RSSHelper\src\RSSHelper
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

    cd <path/to>RSSHelper\src\RSSHelper/platforms/android
    keytool -genkey -v -keystore RSSHelper.keystore -alias RSSHelper -keyalg RSA -keysize 2048 -validity 10000

##### 2.create `release-signing.properties` file

    cd <path/to>RSSHelper\src\RSSHelper/platforms/android
    vi release-signing.properties
    # content like this:
    storeFile=./RSSHelper.keystore
    keyAlias=RSSHelper

##### 3.build

    cd <path/to>RSSHelper\src\RSSHelper
    ionic build --release android

Then an apk file will be generated:

    <path/to>RSSHelper/src/RSSHelper/platforms/android/build/outputs/apk/android-release.apk

