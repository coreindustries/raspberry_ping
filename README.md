raspberry_ping
==============

Use the Raspberry Pi to record ping times to <https://cosm.com>

Uses the child_process to run a system-level ping, then parses the results and sends to Cosm for storage and charting.


Install
-------

To install, first ensure you have git, node and npm installed on your Pi:

```
sudo apt-get install git nodejs npm
```

Then

```
git clone https://github.com/coreindustries/raspberry_ping.git
```

Ensure you're in the directory with index.js, then run:
```
npm install
```

Edit index.js to add your Cosm api key, data feed, and URL to monitor

```
    cosm_api_key = 'enter key here',        // update this
    cosm_data_feed = 'enter feed id here',  // update this
    url = 'google.com',                     // update this
    check_frequency = 5,                    // seconds
 ```

 Run from the same directory where index.js resides:

 ```
 nodejs index.js
 ```

 This script can also run on other variations of Unix, inluding OSX. However you'll have to update the regex to parse the ping response, since each platform has a slightly different ping output. I've included the regex for OS X as a comment.

 You'll also need to update the array position of the value to send to Cosm

 ```
 stream.addPoint(p[6]);  // make this 5, if used on a mac
 ```