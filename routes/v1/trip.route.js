const express = require("express");
const router = express.Router();
const { validate, auth } = require("#middlewares");
const controller = require("#controllers/trip.controller");
const { datatableValidation, globalValidation, tripValidation } = require("#validations/index");

router.get(
	/**
	 * @swagger
	 * /v1/trip:
	 *  get:
	 *    tags:
	 *      - Trip and Tour
	 *    summary: Get all trip and tour
	 *    description: Get all trip and tour
	 *    parameters:
	 *      - $ref: '#/components/parameters/generalDataTable'
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/",
	validate(datatableValidation.generalDataTable),
	(req, res, next) => controller.getAll(req, res).catch(next),
);

router.get(
	/**
	 * @swagger
	 * /v1/trip/{id}:
	 *  get:
	 *    tags:
	 *      - Trip and Tour
	 *    summary: Get detail trip and tour
	 *    description: Get detail trip and tour
	 *    parameters:
	 *      - $ref: '#/components/parameters/paramString'
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/:id",
	validate(globalValidation.paramString),
	(req, res, next) => controller.getById(req, res).catch(next),
);

router.post(
	/**
	 * @swagger
	 * /v1/trip:
	 *  post:
	 *    tags:
	 *      - Trip and Tour
	 *    summary: Create trip and tour
	 *    description: Create trip and tour
	 *    requestBody:
	 *      required: true
	 *      content:
	 *        application/json:
	 *          schema:
	 *            $ref: '#/components/schemas/tripBody'
	 *    security:
	 *      - BearerAuth: []
	 *    responses:
	 *      201:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/",
	auth.verifyToken,
	validate(tripValidation.tripBody),
	(req, res, next) => controller.insert(req, res).catch(next),
);

router.put(
	/**
	 * @swagger
	 * /v1/trip:
	 *  put:
	 *    tags:
	 *      - Trip and Tour
	 *    summary: Update trip and tour
	 *    description: Update trip and tour
	 *    parameters:
	 *      - $ref: '#/components/parameters/paramString'
	 *    requestBody:
	 *      required: true
	 *      content:
	 *        application/json:
	 *          schema:
	 *            $ref: '#/components/schemas/tripBody'
	 *    security:
	 *      - BearerAuth: []
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/",
	auth.verifyToken,
	validate(tripValidation.tripBody),
	(req, res, next) => controller.update(req, res).catch(next),
);

router.delete(
	/**
	 * @swagger
	 * /v1/trip/{id}:
	 *  delete:
	 *    tags:
	 *      - Trip and Tour
	 *    summary: Delete trip and tour
	 *    description: Delete trip and tour
	 *    parameters:
	 *      - $ref: '#/components/parameters/paramString'
	 *    responses:
	 *      200:
	 *        description: Success response
	 *      500:
	 *        description: Internal Server Error
	 */
	"/:id",
	auth.verifyToken,
	validate(globalValidation.paramString),
	(req, res, next) => controller.remove(req, res).catch(next),
);



module.exports = router;