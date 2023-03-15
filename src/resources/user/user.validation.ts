import Joi from 'joi';

const register = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export default { register, login };
