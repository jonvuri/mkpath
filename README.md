# mkpath

## How to use

    var mkpath = require('mkpath');
    
    mkpath('red/green/violet', function (err) {
        if (err) throw err;
        console.log('Directory structure red/green/violet created');
    });
    
    mkpath.sync('/tmp/blue/orange', 0700);

### mkpath(path, [mode,] [callback])

Create all directories that don't exist in `path` with permissions `mode` (`0777 & (~process.umask())` by default). When finished, `callback(err)` fires with the error, if any.

### mkpath.sync(path, [mode]);

Synchronous version of the same.

## License

This software is released under the [MIT license](http://www.opensource.org/licenses/MIT).

