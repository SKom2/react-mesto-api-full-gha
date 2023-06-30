const Card = require('../models/card');
const wrapper = require('./wrapper');
const {
  CREATE,
  SUCCESS
} = require('../constants/ErrorStatuses');
const ForbiddenErr = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');

const getCards = wrapper(() => Card.find({}));

const createCards = wrapper((req) => Card.create({
  owner: req.user._id,
  ...req.body
}), CREATE);

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        next(new NotFoundError('Card Id not found'));
        return;
      }

      const ownerId = card.owner.toHexString();
      const userId = req.user._id;

      if (ownerId !== userId) {
        next(new ForbiddenErr('You do not have permission to delete this card'));
        return;
      }

      Card.findByIdAndDelete(cardId)
        .then((result) => {
          if (result) {
            res.status(SUCCESS).send(result);
          }
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
