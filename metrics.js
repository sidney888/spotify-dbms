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

const condition_metrics = query_metrics.concat([
	"Track Name",
	"Album Name",
	"Artist Name",
	"Key Signature",
	"Time Signature",
	"Album Type",
	"Release Date",
	"Artist Genre"
]);

exports.query_metrics = query_metrics;
exports.condition_metrics = condition_metrics;
