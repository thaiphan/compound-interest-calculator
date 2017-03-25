const LIMIT_MONTH_TAX_PERIOD = 7;

/**
 * @param {Date} date
 * @returns {number}
 */
let getFinancialYear = (date = new Date()) => {
    if (date.getMonth() + 1 < LIMIT_MONTH_TAX_PERIOD) {
        return date.getFullYear() - 1;
    }
    return date.getFullYear();
}

export default getFinancialYear;
