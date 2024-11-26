const express = require("express");
const router = express.Router();
const { validate, auth } = require("#middlewares/index");
const controller = require("#controllers/auth.controller");
const { registerBody, loginBody } = require("#validations/auth.validation");

router.post(
	/**
	 * @swagger
	 * /v1/auth/register:
	 *  post:
	 *    tags:
	 *      - Auth
	 *    summary: Register user
	 *    description: Register user
	 *    requestBody:
	 *      required: true
	 *      content:
	 *        application/json:
	 *          schema:
	 *            $ref: '#/components/schemas/registerBody'
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/register",
	validate(registerBody),
	(req, res, next) => controller.register(req, res).catch(next),
);

router.get(
	/**
	 * @swagger
	 * /v1/auth/info:
	 *  get:
	 *    tags:
	 *      - Auth
	 *    summary: Get user profile
	 *    description: Get user profile
	 *    security:
	 *      - BearerAuth: []
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/info",
	auth.verifyToken,
	(req, res, next) => controller.me(req, res).catch(next),
);

router.post(
	/**
	 * @swagger
	 * /v1/auth/login:
	 *  post:
	 *    tags:
	 *      - Auth
	 *    summary: Login user
	 *    description: Login user
	 *    requestBody:
	 *      required: true
	 *      content:
	 *        application/json:
	 *          schema:
	 *             $ref: '#/components/schemas/loginBody'
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/login",
	validate(loginBody),
	(req, res, next) => controller.login(req, res).catch(next),
);

module.exports = router;
