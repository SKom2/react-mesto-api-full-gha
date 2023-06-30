const { celebrate, Joi } = require('celebrate');

const validateUserBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helpers) => {
      if (!/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

const validateUserEdit = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30)
  })
});

const validateUserAvatarEdit = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().custom((value, helpers) => {
      if (!/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
  })
});

const validateCardBody = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom((value, helpers) => {
      if (!/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/.test(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    })
  })
});

const validUserId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
});

const validCardId = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
  })
});

module.exports = {
  validateUserBody,
  validateCardBody,
  validUserId,
  validCardId,
  validateUserEdit,
  validateUserAvatarEdit
};
