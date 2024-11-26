const express = require("express");
const router = express.Router();
const { validate, auth } = require("#middlewares");
const controller = require("#controllers/file.controller");
const { globalValidation } = require("#validations/index");

router.post(
	/**
	 * @swagger
	 * /v1/file/upload:
	 *  post:
	 *    tags:
	 *      - File
	 *    summary: Upload file
	 *    description: Upload file
	 *    requestBody:
	 *      required: true
	 *      content:
	 *        application/json:
	 *          schema:
	 *             $ref: '#/components/schemas/bodyFile'
	 *    security:
	 *      - BearerAuth: []
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/upload",
	auth.verifyToken,
	validate(globalValidation.bodyFile),
	(req, res, next) => controller.upload(req, res).catch(next),
);

router.post(
	/**
	 * @swagger
	 * /v1/file/download:
	 *  post:
	 *    tags:
	 *      - File
	 *    summary: Upload file
	 *    description: Upload file
	 *    requestBody:
	 *      required: true
	 *      content:
	 *        application/json:
	 *          schema:
	 *             $ref: '#/components/schemas/bodyFile'
	 *    security:
	 *      - BearerAuth: []
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/download",
	auth.verifyToken,
	validate(globalValidation.bodyFile),
	(req, res, next) => controller.download(req, res).catch(next),
);

module.exports = router;
