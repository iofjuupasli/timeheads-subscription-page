var fs = require('fs');

var koa = require('koa');
var app = koa();

app.use(require('koa-bodyparser')());
app.use(require('koa-static')('static'));

var Router = require('koa-router');
var router = new Router()
    .post('/subscribe', function* (next) {
        yield(function (done) {
            fs.appendFile(
                'subscriptions.txt',
                this.request.body.email + '\n',
                function () {
                    done();
                }
            );
        });
        this.redirect('/thanks.html');
        yield next;
    });

app.use(router.middleware());

app.listen(3000, function () {
    console.log('listening on 3000');
});
