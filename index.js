const fs = require("fs");
const getAuthSheets = require("./googleAuth");

const dir = fs.readdirSync("./");
let html;
let values = [[], []];

for (let i = 1; i < dir.length - 8; i++) {
	if (i == 1) {
		html = fs.readFileSync("./messages.html", "utf-8");
	} else {
		html = fs.readFileSync(`./messages${i}.html`, "utf-8");
	}

	const htmlArray = html.split("\n");

	htmlArray.forEach((linha, index) => {
		if (linha.includes('       <div class="text">')) {
			values[0].push(htmlArray[index + 1].split(" has commented")[0]);
			if (
				htmlArray[index + 1]
					.split("<br><br>")[1]
					.includes("ShowHashtag(")
			) {
				values[1].push(
					htmlArray[index + 1]
						.split("<br><br>")[1]
						.split("</a>")[0]
						.split(">")[1]
				);
			} else {
				values[1].push(htmlArray[index + 1].split("<br><br>")[1]);
			}
		}
	});
}

console.log(`Você vai tentar extrair ${values[0].length} comentários`);

getAuthSheets()
	.then((data) => {
		const { googleSheets, auth, spreadsheetId } = data;
		googleSheets.spreadsheets.values
			.append({
				auth,
				spreadsheetId,
				range: "extractionComments",
				valueInputOption: "RAW",

				resource: {
					values: values,
					majorDimension: "COLUMNS",
				},
			})
			.then((data) => {
				console.log(
					`Você extraiu ${
						JSON.parse(data.config.body).values[0].length
					} comentários? Confere lá, anja!`
				);
			})
			.catch((err) => {
				console.log(err);
			});
	})
	.catch((err) => {
		console.log(err);
	});
