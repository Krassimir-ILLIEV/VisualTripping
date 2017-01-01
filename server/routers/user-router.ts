module.exports = function ({ app, data, express }) {
    const passport = require('passport');
    const authController = require('./../controllers/auth-controller')({ data });
    const userRouter = new express.Router();

    userRouter.post('/register', authController.createUser)
        // .post('/login', (req, res) => {
        //     console.log(req.body);
        // });
        .post('/login', passport.authenticate('local', { failureRedirect: '/api/user/failed-login', failureFlash: true }), (req, res) => {
            console.log('loged in!');
            res.json({ success: true, message: 'login successful' });
        })
        .get('/logout', authController.logout)
        .get('/failed-login', (req, res) => {
            res.json({ success: false, message: 'Invalid username or password.' });
        });

    app.use('/api/user', userRouter);
};
