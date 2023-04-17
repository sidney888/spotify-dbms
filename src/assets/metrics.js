const numeric_track_metric_sql = {
	"Track Duration"   : "TrackDuration",
	"Explicitness"     : "Explicit",
	"Acousticness"     : "Acousticness",
	"Danceability"     : "Danceability",
	"Energy"           : "Energy",
	"Instrumentalness" : "Instrumentalness",
	"Liveness"         : "Liveness",
	"Loudness"         : "Loudness",
	"Modality"         : "Major",
	"Speechiness"      : "Speechiness",
	"Tempo"            : "Tempo",
	"Valence"          : "Valence"
};

const numeric_track_metrics = Object.keys(numeric_track_metric_sql);

const numeric_album_metric_sql = {};

for (const metric of numeric_track_metrics) {
	const numeric_metric_sql = numeric_track_metric_sql[metric];
	numeric_album_metric_sql["Average " + metric] = `AVG(${numeric_metric_sql})`;
	numeric_album_metric_sql["Range of " + metric] = `MAX(${numeric_metric_sql}) - MIN(${numeric_metric_sql})`;
}

const numeric_album_metrics = Object.keys(numeric_album_metric_sql);

const string_metric_sql = {
	"Track Name"     : "TrackName",
	"Album Name"     : "AlbumName",
	"Artist Name"    : "ArtistName",
	"Artist Genre"   : "CategoryGenre"
};

const string_metrics = Object.keys(string_metric_sql);

const discrete_metric_sql = {
	"Key Signature"  : "KeySignature",
	"Time Signature" : "TimeSignature",
	"Album Type"     : "AlbumType",
};

const discrete_metrics = Object.keys(discrete_metric_sql);

const nonnumeric_metrics = string_metrics.concat(discrete_metrics).concat(["Release Date"]);

const query_metrics = [
	"Number of Artists",
	"Volume"
];

const query_metrics_track = numeric_track_metrics.concat(query_metrics);

const query_metrics_album = numeric_album_metrics.concat(query_metrics);

const aggregate_metrics = [
	"Release Date"
];

const aggregate_metrics_track = query_metrics_track.concat(aggregate_metrics);

const aggregate_metrics_album = query_metrics_album.concat(aggregate_metrics);

const condition_metrics = nonnumeric_metrics;

const condition_metrics_track = numeric_track_metrics.concat(condition_metrics);

const condition_metrics_album = numeric_album_metrics.concat(condition_metrics);

const track_metrics = numeric_track_metrics.concat(numeric_album_metrics).concat([
	"Track Name",
	"Key Signature",
	"Time Signature"
]);

// frontend
exports.query_metrics_track = query_metrics_track;
exports.query_metrics_album = query_metrics_album;
exports.aggregate_metrics_track = aggregate_metrics_track;
exports.aggregate_metrics_album = aggregate_metrics_album;
exports.condition_metrics_track = condition_metrics_track;
exports.condition_metrics_album = condition_metrics_album;

// backend
exports.numeric_track_metrics = numeric_track_metrics;
exports.numeric_album_metrics = numeric_album_metrics;
exports.string_metrics = string_metrics;
exports.discrete_metrics = discrete_metrics;
exports.nonnumeric_metrics = nonnumeric_metrics;
exports.track_metrics = track_metrics;
exports.metric_sql = {
	...numeric_track_metric_sql,
	...numeric_album_metric_sql,
	...string_metric_sql,
	...discrete_metric_sql,
	"Release Date"      : "ReleaseDate",
	"Volume"            : "COUNT(*)",
	"Number of Artists" : "COUNT(DISTINCT ArtistID)"
};
