raspberry_ping
==============

Use the Raspberry Pi to record ping times to <https://cosm.com>


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

Edit index.js

```
    cosm_api_key = 'enter key here',        // update this
    cosm_data_feed = 'enter feed id here',  // update this
    url = 'google.com',                     // update this
    check_frequency = 5,                    // seconds
 ```