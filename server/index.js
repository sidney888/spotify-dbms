const { connAttrs } = require("./config");
const express = require("express");
const oracledb = require("oracledb");

const PORT = process.env.PORT || 3001;

const app = express();

const tables = [
			"NBUTAKOW.ALBUM",
			"NBUTAKOW.ARTIST",
			"NBUTAKOW.CATEGORIZED_AS",
			"NBUTAKOW.GENRE",
			"NBUTAKOW.RELEASES",
			"EDWARDARZOUMANOV.TRACK",
			"EDWARDARZOUMANOV.WRITES",
			"\"LAUREN.MARIMON\".TRACK",
			"\"LAUREN.MARIMON\".WRITES",
			"SIDNEYTEBBAL.TRACK",
			"SIDNEYTEBBAL.WRITES"
];

async function execute(query) {
	let connection;
	try {
		connection = await oracledb.getConnection(connAttrs);
		const result = await connection.execute(query);
		return result;
	} catch(err) {
		throw err;
	} finally {
		if (connection) {
			try {
				await connection.close();
			} catch(err) {
				throw err;
			}
		}
	}
}

async function count() {
	try {
		let count = 0;
		for (table of tables) {
			const result = await execute(
				`SELECT COUNT(*)
				FROM ${table}`
			);
			count += result.rows[0][0];
		}
		return count;
	} catch (err) {
		throw err;
	}
}

app.get("/api/count", (req, res) => {
	count().then(result => {
		res.json(result);
	}).catch(err => {
		res.json(err);
	});
});

app.get("/api/analyze", (req, res) => {
	const data = JSON.parse(req.query.q);
	execute(
		`SELECT Year, COUNT(*)
		FROM
		(
		SELECT EXTRACT(YEAR FROM ReleaseDate) AS Year
		FROM
		(
		SELECT TrackID, PartOf, Acousticness
		FROM EDWARDARZOUMANOV.TRACK
		UNION ALL
		SELECT TrackID, PartOf, Acousticness
		FROM "LAUREN.MARIMON".TRACK
		UNION ALL
		SELECT TrackID, PartOf, Acousticness
		FROM SIDNEYTEBBAL.TRACK
		)
		INNER JOIN NBUTAKOW.ALBUM ON PartOf = AlbumID
		WHERE ReleaseDate >= DATE '1960-01-01'
		AND ReleaseDate <= DATE '1980-12-31'
		AND Acousticness < 0.5
		)
		GROUP BY Year`
	).then(result => {
		res.json(result.rows);
	}).catch(err => {
		res.json({"error": err});
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
