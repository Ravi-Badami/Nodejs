const adminAuth = (req, res, next) => {
  const token = 'xyz';
  const isAuthenticated = token === 'xyz';
  if (!isAuthenticated) {
    res.status(401).send('No admin rights');
  }
};
module.exports = { adminAuth };
