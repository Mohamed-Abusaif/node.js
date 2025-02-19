const replaceTemplate = (temp, employee) => {
  let output = temp.replace(/{%EMPLOYEE_NAME%}/g, employee.name);
  output = output.replace(/{%EMAIL%}/g, employee.email);
  output = output.replace(/{%SALARY%}/g, employee.salary);
  output = output.replace(/{%ID%}/g, employee.id);
  output = output.replace(/{%LEVEL%}/g, employee.level);
  output = output.replace(/{%YEARS_OF_EXPERIENCE%}/g, employee.yearsOfExperience);
  return output;
};
module.exports = { replaceTemplate };
