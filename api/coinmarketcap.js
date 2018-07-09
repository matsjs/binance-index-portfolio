const axios = require('axios');

/**
 * 
 * @param {*} top_n 
 * @param {*} exclude You probably want to exclude USDT
 */
async function cmc_top_by_mcap (top_n, exclude = []) {
    const response = await axios.get(`https://api.coinmarketcap.com/v2/ticker/?limit=${top_n}`)
    let top_coins = {};
    for (const [key, value] of Object.entries(response.data.data)) {
        top_coins[value.symbol] = {'name': value.name, 'mcap': value.quotes['USD']['market_cap']}
    };
    exclude.forEach(element => {
        delete top_coins[element]
    });
}

module.exports = {
    cmc_top_by_mcap
}