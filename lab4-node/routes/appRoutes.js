// Import Necessary Routes
const employeesRoutes = require("../routes/employeeRoutes");
const profilesRoutes = require("../routes/profileRoutes");
const leavesRoutes = require("../routes/leaveRoutes");

// Function to apply routes
module.exports = (app) => {
  app.use("/api/employees/", employeesRoutes);
  app.use("/api/profiles/", profilesRoutes);
  app.use("/api/leaves/", leavesRoutes);
};
