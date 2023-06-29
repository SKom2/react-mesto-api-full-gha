const router = require('express').Router();
const { errorLogger } = require('express-winston');
const userRouter = require('./users');
const cardRouter = require('./cards');
const { NOT_FOUND } = require('../constants/ErrorStatuses');
const userController = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUserBody } = require('../middlewares/validate');
const { requestLogger } = require('../middlewares/logger');

router.use(requestLogger);

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/signup', validateUserBody, userController.createUser);
router.post('/signin', validateUserBody, userController.login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Запрашиваемая страница не найдена' });
});

router.use(errorLogger);

module.exports = router;
