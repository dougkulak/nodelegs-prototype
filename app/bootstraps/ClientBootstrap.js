module.exports = Boostrap;
function Boostrap(commandMap) {
    var baseDir = '../commands/client/';

    commandMap.mapEvent('CONNECTED', require(baseDir + 'LogClientConnected'));
}