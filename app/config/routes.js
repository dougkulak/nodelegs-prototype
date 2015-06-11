var exports = module.exports = function(router) {
    /* In this file, you set up routes to your controllers and their actions.
     * Routes are very important mechanism that allows you to freely connect
     * different urls to chosen controllers and their actions (functions). */

    router.get('/', 'PagesController.home');
    router.get('/authors', 'AuthorsController.index');
    router.get('/posts', 'PostsController.index');
};