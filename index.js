var cosm = require('cosm'),
    cosm_api_key = 'enter key here',        // update this
    cosm_data_feed = 'enter feed id here',  // update this
    url = 'google.com',                     // update this
    check_frequency = 2,                    // seconds
    client = new cosm.Cosm(cosm_api_key),
    feed = new cosm.Feed(cosm, {id: cosm_data_feed}),
    stream = new cosm.Datastream(client, feed, {id: 1}),
    sys = require('util'),
    exec = require('child_process').exec,
    child;


// kick off the checking, based on check_frequency above
setInterval((function() {
  checkResponse();
}), check_frequency*1000);


function checkResponse(){
   var cmd = 'ping -c 1 '+url;
   child = exec(cmd,
      function (error, stdout, stderr) {

        var p = extract(stdout);
	// console.log(p);

        //sys.print('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }else{
          console.log(url+ " in "+p[1]+" ms");
	  stream.addPoint(p[1]);
        }
});
}

//PING google.com (74.125.224.231) 56(84) bytes of data.
//64 bytes from lax04s08-in-f7.1e100.net (74.125.224.231): icmp_req=1 ttl=57 time=4.41 ms

//--- google.com ping statistics ---
//1 packets transmitted, 1 received, 0% packet loss, time 0ms
//rtt min/avg/max/mdev = 4.416/4.416/4.416/0.000 ms


function extract(str){
    // console.log(str);
    // var pattern = /^([0-9]+) bytes from ([0-9.]+): icmp_seq=([0-9]+) ttl=([0-9]+) time=([0-9.]+) ms/m; // mac ping format
    // var pattern = /^(\d+) bytes from (\d+-\d+-\d+-\d+.\w+.\w+) \((\d+.){4}\): icmp_req=(\d+) ttl=(\d+) time=(\d+.\d) ms/m; // raspberry pi ping format
    var pattern = /time=(\d+.\d.)/;
    var regex = new RegExp(pattern);
    result = regex.exec(str);
    //console.log(result);
    return result;
}


