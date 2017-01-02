module.exports = function ({ app, data, express, authMiddleware }) {
    const passport = require('passport');
    const authController = require('./../controllers/auth-controller')({ data });
    const userController = require('./../controllers/user-controller')({ data });
    const userRouter = new express.Router();

    userRouter.post('/register', authController.registerUser)
        .post('/login',
            passport.authenticate('local', { failureRedirect: '/api/users/failed-login', failureFlash: true }),
            authController.login)
        .get('/logout', authController.logout)
        .get('/failed-login', (req, res) => {
            res.json({ success: false, message: 'Invalid username or password.' });
        })
        .get('/profile', authMiddleware.isAuthenticated, userController.getLoggedUserData)
        .get('/user/:username', userController.getUserByUsername);

    app.use('/api/users', userRouter);
};
