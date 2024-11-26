const tripBody = {
	body: Joi.object({
		title: Joi.string().required().label("Title"),
		image: Joi.string().required().label("image"),
		duration: Joi.string().required().label("Duration"),
		destination: Joi.string().required().label("Destination"),
        transportation: Joi.string().required().label("Transportation"),
        rating: Joi.number().required().label("Rating"),
        price: Joi.number().required().label("Price"),
        history: Joi.string().required().label("History"),
        description: Joi.string().required().label("Description"),
	}),
};

module.exports = {
    tripBody
}