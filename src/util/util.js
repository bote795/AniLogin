'use strict';

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
};
