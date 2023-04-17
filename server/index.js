const { connAttrs } = require("./config");
const {
	numeric_track_metrics,
	nonnumeric_metrics,
	track_metrics,
	metric_sql
} = require("../src/assets/metrics");
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
		for (const table of tables) {
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

function eval_order(dependencies, root, in_order = null, done = null) {
	if (in_order === null) {
		in_order = [];
	}
	if (done === null) {
		done = new Set();
	}
	for (const object of root) {
		if (!done.has(object)) {
			done.add(object);
			eval_order(dependencies, dependencies[root], in_order, done);
			in_order.push(object);
		}
	}
	return in_order;
}

app.get("/api/count", (req, res) => {
	count().then(result => {
		res.json(result);
	}).catch(err => {
		res.json(err);
	});
});

app.get("/api/analyze", (req, res) => {
	const { queries, analyze } = JSON.parse(req.query.q);
	const dependencies = {};
	const clauses = {};
	for (const id in queries) {
		dependencies[id] = [];
		for (const condition of queries[id].conditions) {
			if (condition.agg_function !== null) {
				dependencies[id].push(condition.value.toString());
			}
		}
	}
	const order = eval_order(dependencies, analyze.toString());
	for (const id of order) {
		const query = queries[id];
		const clause = {};
		const query_tables = new Set();
		let artist_relation = "";
		clause.from = `FROM NBUTAKOW.ALBUM\n`; // ALBUM is always needed to get ReleaseDate
		switch (query.type) {
			case "Tracks":
				artist_relation = "Writes";
				query_tables.add("Track");
				break;
			case "Albums":
				artist_relation = "Releases";
		}
		for (const condition of query.conditions) {
			const metric = condition.metric;
			if (metric == "Number of Artists") {
				query_tables.add(artist_relation);
			} else if (metric == "Artist Name") {
				query_tables.add("Artist");
				query_tables.add(artist_relation);
			} else if (metric == "Artist Genre") {
				query_tables.add("Categorized As");
				query_tables.add("Artist");
				query_tables.add(artist_relation);
			} else if (track_metrics.includes(condition.metric)) {
				query_tables.add("Track");
			}
		}
		if (query_tables.has("Writes")) {
			clause.from +=
				`INNER JOIN (
				SELECT *
				FROM EDWARDARZOUMANOV.TRACK
				INNER JOIN EDWARDARZOUMANOV.WRITES
				ON TrackID = WrittenTrack
				UNION ALL
				SELECT *
				FROM "LAUREN.MARIMON".TRACK
				INNER JOIN "LAUREN.MARIMON".WRITES
				ON TrackID = WrittenTrack
				UNION ALL
				SELECT *
				FROM SIDNEYTEBBAL.TRACK
				INNER JOIN SIDNEYTEBBAL.WRITES
				ON TrackID = WrittenTrack
				) ON AlbumID = PartOf\n`;
			if (query_tables.has("Artist")) {
				clause.from += `INNER JOIN NBUTAKOW.ARTIST ON WriterArtist = ArtistID\n`;
			}
		} else {
			if (query_tables.has("Track")) {
				clause.from +=
					`INNER JOIN (
					SELECT *
					FROM EDWARDARZOUMANOV.TRACK
					UNION ALL
					SELECT *
					FROM "LAUREN.MARIMON".TRACK
					UNION ALL
					SELECT *
					FROM SIDNEYTEBBAL.TRACK
					) ON AlbumID = PartOf\n`;
			}
			if (query_tables.has("Releases")) {
				clause.from += `INNER JOIN NBUTAKOW.RELEASES ON AlbumID = ReleasedAlbum\n`;
				if (query_tables.has("Artist")) {
					clause.from += `INNER JOIN NBUTAKOW.ARTIST ON ReleasingArtist = ArtistID\n`;
				}
			}
		}
		if (query_tables.has("Categorized As")) {
			clause.from += `INNER JOIN NBUTAKOW.CATEGORIZED_AS ON ArtistID = CategorizedArtist\n`;
		}
		clauses[id] = clause;
	}
	res.json(clauses);
	/*execute(
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
	});*/
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
