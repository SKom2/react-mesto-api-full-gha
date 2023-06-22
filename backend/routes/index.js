const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NOT_FOUND } = require('../constants/ErrorStatuses');
const userController = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUserBody } = require('../middlewares/validate');

router.post('/signup', validateUserBody, userController.createUser);
router.post('/signin', validateUserBody, userController.login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

module.exports = router;
