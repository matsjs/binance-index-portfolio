const axios = require('axios');

async function get_all_btc_pairs() {
    const response = await axios.get(`https://api.binance.com/api/v3/ticker/bookTicker`)
    return response.data.filter(
        pair => pair.symbol.substring(pair.symbol.length - 3) == 'BTC'
    );
}