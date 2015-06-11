/*******************************************
 * App Context
 */

var ctxApp = {};

(function(context) {
    context.socket = null;
})(ctxApp);

/*******************************************
 * On Ready
 */

$(document).ready(function() {

    /*******************************************
     * Socket Events
     */

    ctxApp.socket = io.connect('/');

    ctxApp.socket.emit('CONNECTED');

    ctxApp.socket.on('LOG_CLIENT_CONNECTED_COMPLETE', function(id) {
        console.log('The server has acknowledged that your client has connected.');
    });

    ctxApp.socket.on('USER_HAS_CONNECTED', function() {
        console.log('A user (could even be me) has connected.');
    });

    ctxApp.socket.on('USER_OTHER_THAN_ME_HAS_CONNECTED', function() {
        console.log('A user that is NOT me has connected.');
    });

    //;
});