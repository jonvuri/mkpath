/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

const mkpath = require('../');
const path = require('path');
const fs = require('fs');
const test = require('tap').test;

test('implicit mode from umask', function (t) {
    t.plan(2);
    const x = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    const y = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    const z = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    
    let file = '/tmp/' + [x,y,z].join('/');
    
    mkpath(file, function (err) {
        if (err) t.fail(err);
        else fs.stat(file, function (err, stat) {
            if (err) t.fail(err)
            else {
                t.equal(stat.mode & 0777, 0777 & (~process.umask()));
                t.ok(stat.isDirectory(), 'target not a directory');
                t.end();
            }
        })
    });
});
