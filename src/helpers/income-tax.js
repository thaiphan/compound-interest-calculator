/**
 * @param {number} annualIncome
 * @returns {number}
 */
let getIncomeTax = annualIncome => {
    let incomeTax = 0;

    if (annualIncome <= 18200) {
        incomeTax += 0;

        incomeTax += (annualIncome - 0) * 0;
    } else if (annualIncome <= 37000) {
        incomeTax += 0;

        incomeTax += (annualIncome - 18200) * 0.19;
    } else if (annualIncome <= 87000) {
        incomeTax += 3572;

        incomeTax += (annualIncome - 37000) * 0.325;
    } else if (annualIncome <= 180000) {
        incomeTax += 19822;

        incomeTax += (annualIncome - 87000) * 0.37;
    } else {
        incomeTax += 54232;

        incomeTax += (annualIncome - 180000) * 0.45;
    }

    return incomeTax;
}

export default getIncomeTax;
