const userAuth = (req, res, next) => {
  const token = 'user';
  const isAuthenticated = token === 'user';
  if (!isAuthenticated) {
    res.status(401).send('No user rights');
  } else next();
};
module.exports = { userAuth };
