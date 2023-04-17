const { connAttrs } = require("./config");
const {
	numeric_track_metrics,
	numeric_album_metrics,
	nonnumeric_metrics,
	discrete_metrics,
	string_metrics,
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

function parse(value, metric) {
	if (string_metrics.includes(metric)) {
		return `'${value}'`;
	} else if (metric == "Release Date") {
		return `TIMESTAMP '${value}'`;
	} else {
		return value;
	}
}

function from_clause(query_table) {
	let from = `FROM NBUTAKOW.ALBUM\n`;
	if (query_table.has("Writes")) {
		from +=
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
		if (query_table.has("Artist")) {
			from += `INNER JOIN NBUTAKOW.ARTIST ON WriterArtist = ArtistID\n`;
		}
	} else {
		if (query_table.has("Track")) {
			from +=
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
		if (query_table.has("Releases")) {
			from += `INNER JOIN NBUTAKOW.RELEASES ON AlbumID = ReleasedAlbum\n`;
			if (query_table.has("Artist")) {
				from += `INNER JOIN NBUTAKOW.ARTIST ON ReleasingArtist = ArtistID\n`;
			}
		}
	}
	if (query_table.has("Categorized As")) {
		if (query_table.has("Artist")) {
			from += `INNER JOIN NBUTAKOW.CATEGORIZED_AS ON ArtistID = CategorizedArtist\n`;
		} else if (query_table.has("Releases")) {
			from += `INNER JOIN NBUTAKOW.CATEGORIZED_AS ON ReleasingArtist = CategorizedArtist\n`;
		} else if (query_table.has("Writes")) {
			from += `INNER JOIN NBUTAKOW.CATEGORIZED_AS ON WriterArtist = CategorizedArtist\n`;
		}
	}
	return from;
}

app.get("/api/count", (req, res) => {
	count().then(result => {
		res.json(result);
	}).catch(err => {
		res.json(err);
	});
});

app.get("/api/analyze", (req, res) => {
	let { queries, analyze } = JSON.parse(req.query.q);
	analyze = analyze.toString();
	const dependencies = {};
	const clauses = {};
	const groups = {};
	const query_tables = {};
	for (const id in queries) {
		dependencies[id] = [];
		for (const condition of queries[id].conditions) {
			if (condition.cvalue == "") {
				dependencies[id].push(condition.qID);
			}
		}
	}
	const order = eval_order(dependencies, analyze);
	for (const id of order) {
		const query = queries[id];
		const type = query.type;
		const query_table = new Set();
		const track_attributes = new Set();
		let artist_relation;
		let from = `FROM NBUTAKOW.ALBUM\n`; // ALBUM is always needed to get ReleaseDate
		let where = ``;
		let group_by = ``;
		let tuple_keyword = `WHERE`;
		let group_keyword =
			`GROUP BY AlbumID, ReleaseDate
			HAVING`;
		if (type == "Tracks") {
			query_table.add("Track");
			artist_relation = "Writes";
		} else if (type == "Albums") {
			artist_relation = "Releases";
		}
		for (const condition of query.conditions) {
			const metric = condition.cmetric;
			const con_attribute = metric_sql[metric];
			const agg_attribute = metric_sql[condition.agg_metric];
			const qID = condition.qID;
			const agg_metric = numeric_album_metrics.includes(metric);
			let track_metric;
			if (agg_metric) {
				track_metric = con_attribute.split("(")[1].split(")")[0];
				track_attributes.add(track_metric);
			}
			let value = condition.cvalue;
			if (metric == "Artist Name") {
				query_table.add("Artist");
				query_table.add(artist_relation);
			} else if (metric == "Artist Genre") {
				query_table.add("Categorized As");
				query_table.add(artist_relation);
			} else if (type == "Albums" && track_metrics.includes(metric)) {
				query_table.add("Track");
			}
			if (value != "") {
				value = parse(value, metric);
			} else {
				const tracks = queries[qID].type == "Tracks";
				const artist_relation = tracks ? "Writes" : "Releases";
				const subquery_table = new Set(query_tables[qID]);
				if (metric == "Artist Name") {
					subquery_table.add("Artist");
					subquery_table.add(artist_relation);
				} else if (metric == "Artist Genre") {
					subquery_table.add("Categorized As");
					subquery_table.add(artist_relation);
				} else if (!tracks && track_metrics.includes(metric)) {
					subquery_table.add("Track");
				}
				const clause = clauses[qID];
				const clause_template =
					`${clause.prefix}
					${from_clause(subquery_table)}
					${clause.where}
					${clause.suffix}`;
				if (agg_attribute == `COUNT(*)`) {
					const type_sql = tracks ? `TrackID` : `AlbumID`;
					value =
						`(
						SELECT ${con_attribute}
						${agg_metric ?
						`FROM
						(
						SELECT DISTINCT TrackID, ${track_metric}, AlbumID`: ""}
						${clause_template}
						GROUP BY ${con_attribute}
						HAVING COUNT(DISTINCT ${type_sql}) =
						(
						SELECT COUNT(DISTINCT ${type_sql})
						${clause_template}
						GROUP BY ${con_attribute}
						ORDER BY COUNT(DISTINCT ${type_sql}) ${(condition.agg_function == "max") ? "DESC" : "ASC"}
						FETCH FIRST 1 ROWS ONLY
						)
						FETCH FIRST 1 ROWS ONLY
						)
						${agg_metric ?
						`)
						GROUP BY AlbumID` : ""}`;
				} else {
					value =
						`(
						SELECT ${con_attribute}
						${agg_metric ?
						`FROM
						(
						SELECT DISTINCT TrackID, ${track_metric}, AlbumID` : ""}
						${clause_template}
						AND ${agg_attribute} =
						(
						SELECT ${agg_attribute}
						${clause_template}
						ORDER BY ${agg_attribute} ${(condition.agg_function == "max") ? "DESC" : "ASC"}
						FETCH FIRST 1 ROWS ONLY
						)
						FETCH FIRST 1 ROWS ONLY
						)
						${agg_metric ?
						`)
						GROUP BY AlbumID` : ""}`;
				}
			}
			if (agg_metric) {
				group_by += `${group_keyword} ${con_attribute} ${condition.operator} ${value}\n`;
				if (group_keyword != `AND`) {
					group_keyword = `AND`;
				}
			} else {
				where += `${tuple_keyword} ${con_attribute} ${condition.operator} ${value}\n`;
				if (tuple_keyword != `AND`) {
					tuple_keyword = `AND`;
				}
			}
		}
		clauses[id] = {
			prefix:
				`${(group_by == `` ? `` :
				`FROM
				(
				SELECT DISTINCT TrackID, ${Array.from(track_attributes).join(", ")}, AlbumID, ReleaseDate`)}`,
			from: from_clause(query_table),
			where: where,
			suffix:
				`${(group_by == `` ? `` :
				`)`)}
				${group_by}`
		};
		query_tables[id] = query_table;
	}
	const query = queries[analyze];
	const query_metric = query.metric;
	const count = query_metric == "Volume";
	const monthly = query.frequency == "Monthly";
	const clause = clauses[analyze];
	const query_table = new Set(query_tables[analyze]);
	const tracks = query.type == "Tracks";
	const con_attribute = metric_sql[query_metric];
	const agg_metric = numeric_album_metrics.includes(query_metric);
	const artist_relation = tracks ? "Writes" : "Releases";
	let track_metric;
	if (agg_metric) {
		track_metric = con_attribute.split("(")[1].split(")")[0];
	}
	if (query_metric == "Artist Name") {
		query_table.add("Artist");
		query_table.add(artist_relation);
	} else if (query_metric == "Artist Genre") {
		query_table.add("Categorized As");
		query_table.add(artist_relation);
	} else if (!tracks && track_metrics.includes(query_metric)) {
		query_table.add("Track");
	}
	let prefix = ``;
	let suffix = ``;
	if (agg_metric) {
		prefix =
			`FROM
			(
			SELECT DISTINCT TrackID, ${track_metric}, AlbumID, ReleaseDate`;
		suffix =
			`)
			GROUP BY AlbumID, ReleaseDate`;
	} else if (query_metric == "Number of Artists") {
		prefix =
			`FROM
			(
			SELECT DISTINCT TrackID, ArtistID, ReleaseDate`;
		suffix =
			`)
			GROUP BY TrackID, ReleaseDate`;
		query_table.add("Artist");
		query_table.add(artist_relation);
	}
	execute(
		`SELECT ${monthly ? "Month," : ""} Year, ${count ? "COUNT(*)" : `AVG(QueryMetric)`}
		FROM
		(
		SELECT DISTINCT ${tracks ? "TrackID" : "AlbumID"}${count ? "" : `, ${con_attribute} AS QueryMetric`},
		EXTRACT(YEAR FROM ReleaseDate) AS Year${monthly ? ", EXTRACT(MONTH FROM ReleaseDate) AS Month" : ""}
		${prefix}
		${clause.prefix}
		${from_clause(query_table)}
		${clause.where}
		${clause.suffix}
		${suffix}
		)
		GROUP BY Year${monthly ? ", Month" : ""}`.replaceAll("\t", "").replaceAll(/\n\s*\n/g,"\n").replaceAll(/ \s* /g, " ")
	).then(result => {
		res.json(result.rows);
	}).catch(err => {
		res.json({"error": err});
	});
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
