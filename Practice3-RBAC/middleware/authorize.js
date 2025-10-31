// middleware/authorize.js
module.exports = function authorize(...allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !user.role) return res.status(403).json({ message: "Forbidden: no role" });
    if (allowedRoles.includes(user.role)) return next();
    return res.status(403).json({ message: "Forbidden: insufficient role" });
  };
};
