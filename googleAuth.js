const { google } = require("googleapis");

module.exports = async function getAuthSheets() {
	// const credentials = {
	// 	private_key: process.env.PRIVATE_KEY,
	// 	client_email: process.env.CLIENT_EMAIL,
	// };
	const auth = new google.auth.GoogleAuth({
		// credentials: credentials,
		keyFile: "credentials.json",
		scopes: "https://www.googleapis.com/auth/spreadsheets",
	});

	const client = await auth.getClient();

	const googleSheets = google.sheets({
		version: "v4",
		auth: client,
	});

	const spreadsheetId = "1Ka0iTsErr8HUwHHnDpwNA9HBlvAY-kZcNrK2ffxKgxs";

	return {
		auth,
		client,
		googleSheets,
		spreadsheetId,
	};
};
