var express = require("express");
var createError = require("http-errors");
var cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const cors = require("cors");
const helper = require("#lib/response");
const { logger, responseInterceptor } = require("#middlewares");
const { urlPrefix } = require("./config/vars");
const specs = require("./swagger-specs");

var app = express();
app.disable("x-powered-by");
app.use(cors({ origin: "*" }));
app.use(responseInterceptor);
app.use(logger);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();
const v1 = require("./routes/v1");

app.use(urlPrefix, router);
router.use("/v1", v1);
app.get("/", (req, res) => {
	res.json({ app: "SHOPEE API" });
});

if (process.env.NODE_ENV === "development") {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404, "Not Found", { expose: false }));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	// res.locals.message = err.message;
	// res.locals.error = req.app.get('env') === 'development' ? err : {};
	if (res.headersSent) return;
	// render the error page
	res.status(err.status || 500);
	if (err.status == 503 || err.status == 404) {
		return res.json({ success: false, message: err.message });
	} else {
		return helper.errorHelper(req, res, 500, undefined, err);
	}
});

module.exports = app;
