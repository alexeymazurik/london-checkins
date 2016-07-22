/**
 * Created by alekseymazurik on 7/21/16.
 */

//window.procData = [];

function processedData(data) {
	var dataLines   = data.trim().split(/\r\n|\n/),
			headings    = dataLines[0].split(','),
			result      = [];

	for (var i = 1; i < dataLines.length; ++i) {
		var resultedObj  = {},
				splittedLine = dataLines[i].split(',');

		for (var j = 0; j < headings.length; j++) {
			resultedObj[headings[j]] = splittedLine[j];
		}
		result.push(resultedObj);
	}

	return result;
}

function getData() {
	var d = $.Deferred();

	$.get('median_price.txt').then(function(data){
		window.procData = processedData(data);
		d.resolve();
	}, function(e){
		console.error(e);
		d.resolve();
	});

	return d.promise();
}