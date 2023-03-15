import e, { Response, Request, NextFunction, RequestHandler } from 'express';
import Joi from 'joi';

function validationMiddleware(schema: Joi.Schema): RequestHandler {
    return async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const validationOptions = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };
        try {
            const value = await schema.validateAsync(
                req.body,

                validationOptions
            );
            req.body = value;
            next();
        } catch (e: any) {
            const errors: string[] = [];
            e.details.forEach((error: Joi.ValidationError) => {
                errors.push(error.message);
            });
            res.status(400).send({ errors: errors });
        }
    };
}

export default validationMiddleware;
