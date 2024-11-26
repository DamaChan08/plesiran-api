const getSkipAndTake = (page, pageSize) => {
	const offset = Number(page);
	const limit = Number(pageSize);
	return {
		offset: offset > 0 ? (offset - 1) * limit : 0,
		limit: limit > 0 ? limit : 10,
	};
};

const isNullOrEmpty = (obj) => {
	if (obj === null || obj === undefined || obj === "") {
		return true;
	}

	if (typeof obj === "object") {
		return Object.keys(obj).length === 0;
	}

	if (Array.isArray(obj)) {
		return obj.length === 0;
	}

	return false;
};

const fileMimeType = new Map([
	[".txt", "text/plain"],
	[".pdf", "application/pdf"],
	[".doc", "application/vnd.ms-word"],
	[".docx", "application/vnd.ms-word"],
	[".xls", "application/vnd.ms-excel"],
	[
		".xlsx",
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
	],
	[".xlsb", "application/vnd.ms-excel"],
	[".ppt", "application/vnd.ms-powerpoint"],
	[
		".pptx",
		"application/vnd.openxmlformats-officedocument.presentationml.presentation",
	],
	[".xlsm", "application/vnd.ms-excel.sheet.macroEnabled.12"],
	[".png", "image/png"],
	[".jpg", "image/jpeg"],
	[".jpeg", "image/jpeg"],
	[".gif", "image/gif"],
	[".tif", "image/tiff"],
	[".tiff", "image/tiff"],
	[".csv", "text/csv"],
	[".zip", "application/zip"],
	[".msg", "application/vnd.ms-outlook"],
]);

module.exports = {
	getSkipAndTake,
	isNullOrEmpty,
	fileMimeType,
};
