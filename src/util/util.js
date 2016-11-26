'use strict';
const debug = require('debug')('anilogin:util');
const now = function()
{
    return Math.floor(Date.now() / 1000);
}
const isExpired = function(expirationTime)
{
    return expirationTime <= now() + 300
};

module.exports = {
    isExpired,
    writeToFile: (filename, text) =>
    {
        var fs = require('fs');
        var path = `./${filename}`;
        fs.writeFile(path, text, function(err)
        {
            if (err)
            {
                return debug(err);
            }

            debug("The file was saved!");
        });
    }
};
