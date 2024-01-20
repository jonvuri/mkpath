/* Tests borrowed from substack's node-mkdirp
 * https://github.com/substack/node-mkdirp */

 const mkpath = require('../');
const fs = require('fs');
const test = require('tap').test;

let ps = [ '', 'tmp' ];

for (let i = 0; i < 25; i++) {
    const dir = Math.floor(Math.random() * Math.pow(16,4)).toString(16);
    ps.push(dir);
}

let file = ps.join('/');

// a file in the way
const itw = ps.slice(0, 3).join('/');


test('clobber-pre', function (t) {
    console.error("about to write to "+itw)
    fs.writeFileSync(itw, 'I AM IN THE WAY, THE TRUTH, AND THE LIGHT.');

    fs.stat(itw, function (er, stat) {
        t.ifError(er)
        t.ok(stat && stat.isFile(), 'should be file')
        t.end()
    })
})

test('clobber', function (t) {
    t.plan(2);
    mkpath(file, 0755, function (err) {
        t.ok(err);
        t.equal(err.code, 'ENOTDIR');
        t.end();
    });
});
