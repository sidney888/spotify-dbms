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

let numeric_album_metrics = [];

for (const numeric_metric of numeric_track_metrics) {
	numeric_album_metrics.push("Average " + numeric_metric);
	numeric_album_metrics.push("Range of " + numeric_metric);
}

const nonnumeric_metric_sql = {
	"Release Date"   : "ReleaseDate",
	"Track Name"     : "TrackName",
	"Album Name"     : "AlbumName",
	"Artist Name"    : "ArtistName",
	"Key Signature"  : "KeySignature",
	"Time Signature" : "TimeSignature",
	"Album Type"     : "AlbumType",
	"Artist Genre"   : "CategorizedGenre"
};

const nonnumeric_metrics = Object.keys(nonnumeric_metric_sql);

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

const condition_metrics = nonnumeric_metrics.concat([
	"Number of Artists"
]);

const condition_metrics_track = numeric_track_metrics.concat(condition_metrics);

const condition_metrics_album = numeric_album_metrics.concat(condition_metrics);

const track_metrics = numeric_track_metrics.concat(numeric_album_metrics).concat([
	"Track Name",
	"Key Signature",
	"Time Signature"
]);

exports.numeric_track_metrics = numeric_track_metrics;
exports.nonnumeric_metrics = nonnumeric_metrics;
exports.query_metrics_track = query_metrics_track;
exports.query_metrics_album = query_metrics_album;
exports.aggregate_metrics_track = aggregate_metrics_track;
exports.aggregate_metrics_album = aggregate_metrics_album;
exports.condition_metrics_track = condition_metrics_track;
exports.condition_metrics_album = condition_metrics_album;
exports.track_metrics = track_metrics;
exports.metric_sql = {...numeric_track_metric_sql, ...nonnumeric_metric_sql};
