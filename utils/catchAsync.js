// Export utility to execute async functions and catch its associated error at one place
module.exports = fn => {
    return (req, res, next) => fn(req, res, next).catch(next);
};