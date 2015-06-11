module.exports = Boostrap;
function Boostrap(commandMap) {
    var baseDir = '../commands/server/';
    // Configuration
    commandMap.mapEvent('STARTUP_COMPLETE', require(baseDir + 'LoadConfiguration'));
    commandMap.mapEvent('LOAD_CONFIGURATION_COMPLETE', require(baseDir + 'SetupExceptionMailer'));

    // Database
    commandMap.mapEvent('LOAD_CONFIGURATION_COMPLETE', require(baseDir + 'ConnectDatabase'));
    commandMap.mapEvent('CONNECT_DATABASE_COMPLETE', require(baseDir + 'PrepareModels'));
    commandMap.mapEvent('PREPARE_MODELS_COMPLETE', require(baseDir + 'PopulateModels'));

    // Express
    commandMap.mapEvent('POPULATE_MODELS_COMPLETE', require(baseDir + 'CreateExpressApplication'));
    commandMap.mapEvent('CREATE_EXPRESS_APPLICATION_COMPLETE', require(baseDir + 'SetupExpressEnvironment'));
    commandMap.mapEvent('SETUP_EXPRESS_ENVIRONMENT_COMPLETE', require(baseDir + 'ConfigureExpressRoutes'));
    commandMap.mapEvent('CONFIGURE_EXPRESS_ROUTES_COMPLETE', require(baseDir + 'CreateExpressHttpServer'));

    // Socket
    commandMap.mapEvent('CREATE_EXPRESS_HTTP_SERVER_COMPLETE', require(baseDir + 'SetupSocketServer'));
    commandMap.mapEvent('SOCKET_CONNECTION_COMPLETE', require(baseDir + 'SetupClientBootstrap'));
}