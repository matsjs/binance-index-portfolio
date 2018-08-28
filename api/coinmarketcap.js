const axios = require('axios');
const keystore = require('./cmc_key.js') 
// TODO: set this environment variable

/**
 * DEPRECATED
 * @param {*} top_n 
 * @param {*} exclude You probably want to exclude USDT
 */
async function cmc_top_by_mcap (top_n, exclude = []) {
    const response = await axios.get(`https://api.coinmarketcap.com/v2/ticker/?limit=${top_n}`)
    let top_coins = {};r
    for (const [key, value] of Object.entries(response.data.data)) {
        top_coins[value.symbol] = {'name': value.name, 'mcap': value.quotes['USD']['market_cap']}
    };
    exclude.forEach(element => {
        delete top_coins[element]
    });
}


async function get_coin_data (tickers) {
    const response = await axios.get(
        `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${tickers}`,
        { headers : { 'X-CMC_PRO_API_KEY' : keystore.key } }
        )
    return response.data.data 
}

module.exports = {
    cmc_top_by_mcap,
    get_coin_data
}