function dateFormater(yyyymmdd) {
    const year = yyyymmdd.substr(0, 4);
    const month = yyyymmdd.substr(4, 2);
    const day = yyyymmdd.substr(6, 2);
    return `${year}-${month}-${day}`;
}

module.exports = dateFormater;