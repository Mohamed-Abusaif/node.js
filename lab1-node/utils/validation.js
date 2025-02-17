const validateEmployeeData = (data) => {
  const { name, email, salary, Level, yearsOfExperience } = data;

  if (!name || typeof name !== "string") return "Invalid name!";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Invalid email!";
  if (!salary || isNaN(salary) || salary <= 0) return "Invalid salary!";
  if (Level && !["Jr", "Mid-Level", "Sr", "Lead"].includes(Level)) return "Invalid level!";
  if (yearsOfExperience && (isNaN(yearsOfExperience) || yearsOfExperience < 0))
    return "Invalid years of experience!";
  
  return null;
};

module.exports = { validateEmployeeData };
