var cosm = require('cosm'),
    cosm_api_key = 'enter key here',
    cosm_data_feed = 'enter feed id here',
    url = 'google.com',
    client = new cosm.Cosm(cosm_api_key),
    feed = new cosm.Feed(cosm, {id: cosm_data_feed}),
    stream = new cosm.Datastream(client, feed, {id: 1}),
    sys = require('sys'),
    exec = require('child_process').exec,
    child;





setInterval((function() {
  checkResponse();
}), 5000);

function checkResponse(){
   child = exec('ping -c 1 '+url, 
  function (error, stdout, stderr) {
    // sys.print('stdout: ' + stdout);

    var p = extract(stdout);
    // console.log(p[5]);

    // var i=0;
    // stdout.split(/\r?\n/).forEach(function (line) {
    //     extract(line);
    //     console.log(i++, line);
    // });


    sys.print('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }else{
        stream.addPoint(p[5]);
    }
}); 
}



var str = '64 bytes from 24.28.199.168: icmp_seq=0 ttl=53 time=78.593 ms';
// 64 bytes from 24.28.199.168: icmp_seq=0 ttl=51 time=72.211 ms

// --- rr.com ping statistics ---
// 1 packets transmitted, 1 packets received, 0.0% packet loss
// round-trip min/avg/max/stddev = 72.211/72.211/72.211/0.000 ms

// extract(str);

// http://www.w3schools.com/jsref/jsref_obj_regexp.asp

function extract(str){
    // console.log("extract from "+str);
    var pattern = /^([0-9]+) bytes from ([0-9.]+): icmp_seq=([0-9]+) ttl=([0-9]+) time=([0-9.]+) ms/m;
    var regex = new RegExp(pattern);
    result = regex.exec(str);
    return result;
    // console.log(result);
}

// ping.configure();
// ping();
