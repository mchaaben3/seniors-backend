import Joi from 'joi';

const create = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
});

export default { create };
