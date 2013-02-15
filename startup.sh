#! /bin/sh
# /etc/init.d/raspberry_ping 

### BEGIN INIT INFO
# Provides:          raspberry_ping
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Pings a server, saves results
# Description:       Sends a ping, saves result to Cosm. https://github.com/coreindustries/raspberry_ping.git
### END INIT INFO

# If you want a command to always run, put it here

# Carry out specific functions when asked to by the system
case "$1" in
  start)
    echo "Starting raspberry_ping"
    # run application you want to start
    /usr/bin/nodejs /home/pi/raspberry_ping/index.js
    ;;
  stop)
    echo "Stopping raspberry_ping NOT IMPLIMENTED YET"
    # kill application you want to stop
    #killall noip2
    ;;
  *)
    echo "Usage: /etc/init.d/raspberry_ping {start|stop}"
    exit 1
    ;;
esac

exit 0
