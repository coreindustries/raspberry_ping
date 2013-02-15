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

        sys.print('stderr: ' + stderr);
        if (error !== null) {
          console.log('exec error: ' + error);
        }else{
            stream.addPoint(p[6]);  // make this 5, if used on a mac
        }
});
}



// 64 bytes from 24.28.199.168: icmp_seq=0 ttl=51 time=72.211 ms

// --- rr.com ping statistics ---
// 1 packets transmitted, 1 packets received, 0.0% packet loss
// round-trip min/avg/max/stddev = 72.211/72.211/72.211/0.000 ms

// extract(str);

// http://www.w3schools.com/jsref/jsref_obj_regexp.asp

function extract(str){
    console.log(str);
    // var pattern = /^([0-9]+) bytes from ([0-9.]+): icmp_seq=([0-9]+) ttl=([0-9]+) time=([0-9.]+) ms/m; // mac ping format
    var pattern = /^(\d+) bytes from (\d+-\d+-\d+-\d+.\w+.\w+) \((\d+.){4}\): icmp_req=(\d+) ttl=(\d+) time=(\d+.\d) ms/m; // raspberry pi ping format
    var regex = new RegExp(pattern);
    result = regex.exec(str);
    console.log(result);
    return result;
}


