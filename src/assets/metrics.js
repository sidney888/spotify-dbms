const query_metrics = [
	"Average Track Duration",
	"Average Explicitness",
	"Average Acousticness",
	"Average Danceability",
	"Average Energy",
	"Average Instrumentalness",
	"Average Liveness",
	"Average Loudness",
	"Average Modality",
	"Average Speechiness",
	"Average Tempo",
	"Average Valence",
	"Average Number of Artists",
	"Volume"
];

const aggregate_metrics = query_metrics.concat([
	"Release Date",
]);

const condition_metrics = aggregate_metrics.concat([
	"Track Name",
	"Album Name",
	"Artist Name",
	"Key Signature",
	"Time Signature",
	"Album Type",
	"Artist Genre"
]);

exports.query_metrics = query_metrics;
exports.aggregate_metrics = aggregate_metrics;
exports.condition_metrics = condition_metrics;
