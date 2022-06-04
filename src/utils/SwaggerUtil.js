const Joi = require("joi");

const SwaggerUtil = {
    infoResponse: () => {
        return Joi.object({
            status: Joi.string(),
            message: Joi.string(),
        }).label('Information Model');
    },
    baseResponse: (data, message = undefined) => {
        const response = {
            status: Joi.string(),
        };
        if (message) response.message = message;
        response.data = data;
        return Joi.object(response).label('Base Model');
    },
    foodResponse: () => {
        return Joi.object({
            id: Joi.string(),
            name: Joi.string(),
            description: Joi.string(),
            origin: Joi.string(),
            province: Joi.string(),
            image: Joi.string().optional(),
            created_at: Joi.number().description('UNIX time'),
            updated_at: Joi.number().optional().description('UNIX time'),
        }).label('Food Model');
    },
    historyResponse: () => {
        return Joi.object({
            id: Joi.string(),
            image: Joi.string(),
            status: SwaggerUtil.analyzeResultStatus(),
            food: {
                id: Joi.string(),
                name: Joi.string(),
                description: Joi.string(),
                origin: Joi.string(),
                province: Joi.string(),
                image: Joi.string(),
                created_at: Joi.string(),
            },
        }).label('History Model');
    },
    tokenInvalidResponse: () => {
        return Joi.object({
            statusCode: 401,
            error: Joi.string(),
            message: Joi.string(),
            attributes: {
                error: Joi.string(),
            },
        }).label('Token Invalid Model');
    },
    analyzeResultStatus: () => {
        return Joi.string().valid('obtained', 'not_found', 'error').label('Analyze Result Status');
    },
    makeArray: (items) => {
        return Joi.array().items(items);
    }
};

module.exports = SwaggerUtil;
