'use strict';

const fs = require('fs');
const path = require('path');

// thing below could be const as well in case we are not changing it, but it seems like we does
let mkpath = function mkpath(dirpath, mode, callback) {
    dirpath = path.resolve(dirpath);

    if (typeof mode === 'function' || typeof mode === 'undefined') {
        callback = mode;
        mode = parseInt('0777', 8) & (~process.umask());
    }

    if (!callback) {
        callback = function () {};
    }

    fs.stat(dirpath, function (err, stats) {
        if (err) {
            if (err.code === 'ENOENT') {
                mkpath(path.dirname(dirpath), mode, function (err) {
                    if (err) {
                        callback(err);
                    } else {
                        fs.mkdir(dirpath, mode, function (err) {
                            if (!err || err.code == 'EEXIST') {
                                callback(null);
                            } else {
                                callback(err);
                            }
                        });
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

mkpath.sync = function mkpathsync(dirpath, mode) {
    dirpath = path.resolve(dirpath);

    if (typeof mode === 'undefined') {
        mode = parseInt('0777', 8) & (~process.umask());
    }

    try {
        if (!fs.statSync(dirpath).isDirectory()) {
            throw new Error(dirpath + ' exists and is not a directory');
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            mkpathsync(path.dirname(dirpath), mode);
            fs.mkdirSync(dirpath, mode);
        } else {
            throw err;
        }
    }
};

module.exports = mkpath;
