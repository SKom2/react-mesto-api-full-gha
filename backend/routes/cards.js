const router = require('express').Router();
const {
  createCards, getCards, deleteCard, putCardLike, deleteCardLike
} = require('../controllers/cards');
const {
  validateCardBody,
  validCardId
} = require('../middlewares/validate');

router.post('/', validateCardBody, createCards);
router.get('/', getCards);
router.delete('/:cardId', validCardId, deleteCard);
router.put('/:cardId/likes', validCardId, putCardLike);
router.delete('/:cardId/likes', validCardId, deleteCardLike);

module.exports = router;
