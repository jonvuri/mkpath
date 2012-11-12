var fs = require('fs');
var path = require('path');

module.exports = mkdirp.mkdirp = mkdirp;

function mkdirp(dirpath, mode, callback) {
    dirpath = path.resolve(dirpath);
    if (typeof mode === 'function' || typeof mode === 'undefined') {
        callback = mode;
        mode = 0777 & (~process.umask());
    }
    if (!callback) {
        callback = function () {};
    }
    
    fs.stat(dirpath, function (err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                mkdirp(path.dirname(dirpath), mode, function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        fs.mkdir(dirpath, mode, callback);
                    }
                });
            } else {
                callback(err);
            }
        } else if (stats.isDirectory()) {
            callback(null);
        } else {
            callback(new Error(dirpath + ' exists and is not a directory'));
        }
    });
};
