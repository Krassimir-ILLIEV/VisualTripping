module.exports = {
    isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('here!');
            next();
        } else {
            res.status(401)
                .json({success: false, message: 'Unauthorized!'});
        }
    }
};
