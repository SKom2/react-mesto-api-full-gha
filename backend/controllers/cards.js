const Card = require('../models/card');
const wrapper = require('./wrapper');
const {
  CREATE,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  SUCCESS
} = require('../constants/ErrorStatuses');

const getCards = wrapper(() => Card.find({}));

const createCards = wrapper((req) => Card.create({
  owner: req.user._id,
  ...req.body
}), CREATE);

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Card Id not found' });
        return;
      }

      const ownerId = card.owner.toHexString();
      const userId = req.user._id;

      if (ownerId !== userId) {
        res.status(403).send({ message: 'You do not have permission to delete this card' });
        return;
      }

      Card.findByIdAndDelete(cardId)
        .then((result) => {
          if (result) {
            res.status(SUCCESS).send(result);
          }
        })
        .catch((err) => {
          res.status(INTERNAL_SERVER_ERROR).send({
            message: 'An error occurred on the server',
            stack: err.stack
          });
        });
    })
    .catch((err) => {
      res.status(INTERNAL_SERVER_ERROR).send({
        message: 'An error occurred on the server',
        stack: err.stack
      });
    });
};

const putCardLike = wrapper((req) => {
  const { cardId } = req.params;
  return Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true }
  );
});

const deleteCardLike = wrapper((req) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true, runValidators: true }
));

module.exports = {
  createCards,
  getCards,
  deleteCard,
  putCardLike,
  deleteCardLike
};
