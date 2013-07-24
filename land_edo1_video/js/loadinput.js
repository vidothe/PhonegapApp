var VIDEO="Video";
var IMAGE="Img";
var TEXT="Txt";

function loadForm(dataFile) {
	$.getJSON(dataFile, function(zoneObjects) {
		$.each(zoneObjects, function(i, zoneObject) {
			$("#input_fields").append(generateZoneDivTag(zoneObject.id));
			$.each(zoneObject.data, function(i, itemObject){
				$("#input_fields").append(generateInputDiv(itemObject))
			});
		});
	});
}

function generateZoneDivTag(id) {
	return "<div class=\"header_clear\"><label id=\"" + id + "\">" + generateNameFromId(id) + "</label></div>";
}

function generateInputDiv(zone_item) {
	var accept = "image/*";
	zone_item.content_type
	return "<div class=\"clear\"><div class=\"float_lt lable\"><label>" 
	+ generateNameFromId(zone_item.id) + "</label></div><div class=\"float_lt\"><input name=\"" 
	+ zone_item.id + "\" type=\"" + getInputType(zone_item.content_type) 
	+ "\" class=\"ip_txt2\" id=\"" + zone_item.id + "\" value=\"" + zone_item.value + "\"></div><p class=\"clear\"></p></div>";
}

function getInputType(content_type) {
	if (content_type.match(VIDEO) || content_type.match(IMAGE)) {
		return "file";
	} else if (content_type.match(TEXT)) {
		return "text";
	}
}

function generateNameFromId(id) {
	return id;
}