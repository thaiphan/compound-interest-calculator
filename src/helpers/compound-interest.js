/**
 * @param {number} principal 
 * @param {number} annualRate 
 * @param {number} compoundsPerYear 
 * @returns {number}
 */
let getCompoundInterestForPrincipal = (principal, annualRate, compoundsPerYear) => (
    principal * Math.pow(1 + annualRate / compoundsPerYear, compoundsPerYear)
);

/**
 * @param {number} deposit 
 * @param {number} annualRate 
 * @param {number} compoundsPerYear 
 * @returns {number}
 */
let getCompoundInterestForDeposits = (deposit, annualRate, compoundsPerYear) => {
    let compoundRate = annualRate / compoundsPerYear;

    return deposit * ((Math.pow(1 + compoundRate, compoundsPerYear) - 1) / compoundRate);
};

/**
 * @param {number} principal
 * @param {number} deposit
 * @param {number} annualRate
 * @param {number} compoundsPerYear
 * @returns {number}
 */
let getCompoundInterest = (principal, deposit, annualRate, compoundsPerYear) => (
    getCompoundInterestForPrincipal(principal, annualRate, compoundsPerYear) +
    getCompoundInterestForDeposits(deposit, annualRate, compoundsPerYear)
);

export default getCompoundInterest;