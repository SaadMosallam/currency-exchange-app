export const fetchResult = async ({ from, to, amount }) => {
    const url = `https://currency-exchange.p.rapidapi.com/exchange?from=${from}&to=${to}&q=${amount}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '9af8210d71msh0adc58de1e15513p12c61ajsn6b967a6e4108',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    const result = await response.text();
    return result;
};