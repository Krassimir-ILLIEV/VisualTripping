module.exports = function ({ app, data, express }) {
    const authController = require('./../controllers/auth-controller')({ data });
    const userRouter = new express.Router();

    userRouter.post('/', authController.tryToCreateUser);

    app.use('/api/user', userRouter);
};
