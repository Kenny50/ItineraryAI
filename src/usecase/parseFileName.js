/**
 * @param {String} fileName format ,should be stockNumber, securitiesFirms, date, rate
 * ex. 2050 UBS 20230418 Sell.pdf
 * @returns {PdfFormat}
 */
function parseFileName(fileName){

    // const regex = /^(\d+)\s+(\w+)\s+(\d{8})\s+(\w+)\.pdf$/i;
    const regex = /^(\d+[A-Z]?)(?:\s+([a-z0-9]+))?\s+(\d{8})\s+(\w+\d?%?)?\.pdf/i;

    const [, stockNumber, securitiesFirms, date, rate] = regex.exec(fileName);
    
    console.log('stockNumber:', stockNumber);
    console.log('securitiesFirms:', securitiesFirms);
    console.log('Date:', date);
    console.log('rate:', rate);
    return new PdfFormat(stockNumber, securitiesFirms, date, rate);
}

class PdfFormat{
    constructor(stockNumber, securitiesFirms, date, rate){
        this.stockNumber = stockNumber;
        this.securitiesFirms = securitiesFirms;
        this.date = date;
        this.rate = rate;
    }
}
module.exports = parseFileName;