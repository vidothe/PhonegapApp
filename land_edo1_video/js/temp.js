var VIDEO="Video";
var IMAGE="Img";
var IMAGE_TEXT="ImgTxt";
var TEXT="Txt";

function bindDataString(dataString) {
	var zoneObjects = $.parseJSON(dataString);
	$.each(zoneObjects, function(i, zoneObject) {
		bindZone(zoneObject.id, zoneObject.data);
	});

}

function windowpop(url) {
	var leftPosition, topPosition, width, height;
	width = 800;
	height = 450;
	//Allow for borders.
	leftPosition = (window.screen.width / 2) - ((width / 2) + 10);
	//Allow for title and status bars.
	topPosition = (window.screen.height / 2) - ((height / 2) + 50);
	//Open the window.
	window.open(url, "Window2", "status=no,height=" + height + ",width=" + width + ",resizable=yes,left=" + leftPosition + ",top=" + topPosition + ",screenX=" + leftPosition + ",screenY=" + topPosition + ",toolbar=no,menubar=no,scrollbars=no,location=no,directories=no");
}

function bindZone(zone_id, data) {
	$.each(data, function(i, item) {
		bindClass(item.id, item.content_type, item.value);
	})
}

function bindClass(item_id, item_content_type, item_value) {
	if(item_content_type.match(VIDEO) != null) {
		$("#" + item_id).attr("src", item_value);
	} else if (item_content_type.match(IMAGE) != null) {
		$("#" + item_id).attr("src", item_value);
	} else if (item_content_type.match(TEXT) != null) {
		$("#" + item_id).html(item_value);
	} else if (item_content_type.match(IMAGE_TEXT) != null) {
		$('#' + item_id).attr("alt", item_value);
	}
}

// The test utility function to generate json document from index.html file that is follow Anvy template convention.
function generateJsonDataFromHtml() {
	// Select all zones element by Id.
	var zones = selectAllZones();
	var zoneObjets = new Array();
	$.each(zones, function(i, zone){
		var itemObjects = new Array();
		var items = selectAllZoneItems(zone.id);
		$.each(items, function(i, item){
			var item_value = $("#" + item.id).attr("src");
			if (item_value == null) {
				item_value = $.trim($("#" + item.id).html());
			}
			var itemObject = generateZoneItemObject(item.id, item_value);
			itemObjects.push(itemObject);
		});
		var zoneObject = generateZoneObject(zone.id, "", itemObjects);
		zoneObjets.push(zoneObject);
	});
	console.log(JSON.stringify(zoneObjets));
}

// The test utility function to generate json document from index.html file that is follow Anvy template convention.
function generateJsonDataFromInput() {
	// Select all zones element by Id.
	var zones = selectAllZones();
	var zoneObjets = new Array();
	$.each(zones, function(i, zone){
		var itemObjects = new Array();
		var items = selectAllZoneItems(zone.id);
		$.each(items, function(i, item){
			var itemObject = generateZoneItemObject(item.id, item.value);
			itemObjects.push(itemObject);
		});
		var zoneObject = generateZoneObject(zone.id, "", itemObjects);
		zoneObjets.push(zoneObject);
	});
	return JSON.stringify(zoneObjets);
}

function selectAllZones() {
	return $("[id^='tmp_zone_']").not("[id$='Txt']").not("[id$='Img']").not("[id$='Video']");
}

function selectAllZoneItems(zone_id) {
	return $("[id^='" + zone_id + "_']")
}

function generateZoneObject(zone_id, zone_bg, zone_data) {
	var result = new Object();
	result.id=zone_id;
	result.background=zone_bg;
	result.data = zone_data;
	return result;
}

function generateZoneItemObject(item_id, item_value) {
	var result = new Object();
	result.id = item_id;
	result.content_type = getContentTypeById(item_id);
	result.value = item_value;
	if (item_value != "") {
		if (result.content_type == VIDEO && item_value.match("videos/") == null) {
			result.value = "videos/" + item_value;
		} else if (result.content_type == IMAGE && item_value.match("images/") == null) {
			result.value = "images/" + item_value;
		} else if (result.content_type == TEXT || result.content_type == IMAGE_TEXT) {
			result.value = item_value;
		}		
	}
	
	return result;
}

// Get content type by given id follow the format "*_[Txt|Img|Video]"
function getContentTypeById(formated_id) {
	if (formated_id.match(IMAGE) != null) {
		return IMAGE;
	} else if (formated_id.match(VIDEO) != null) {
		return VIDEO;
	} else if (formated_id.match(IMAGE_TEXT) != null) {I
		return IMAGE_TEXT;
	} else if (formated_id.match(TEXT) != null) {
		return TEXT;
	} 
}

function FitToScreen(FitType)
{
    var Wrapper = document.getElementById('wrapper');

    var ScreenWidth = window.innerWidth;
    var ScreenHeight = window.innerHeight;

    var WrapperWidth = Wrapper.offsetWidth;
    var WrapperHeight = Wrapper.offsetHeight + 200;

    var WidthRatio = parseFloat(ScreenWidth/WrapperWidth);
    var HeightRatio = parseFloat(ScreenHeight/WrapperHeight);

    var ScaleRatio = 1.0;

    if (FitType == 'width')
    {
        ScaleRatio = WidthRatio;
        if(ScaleRatio * WrapperHeight > ScreenHeight)
        {
            ScaleRatio = parseFloat(ScreenWidth/(WrapperWidth + GetScrollBarWidth () -1));
        }
    }
    else if (FitType == 'height')
    {
        ScaleRatio = HeightRatio;
        if(ScaleRatio * WrapperWidth > ScreenWidth)
        {
            ScaleRatio = parseFloat(ScreenHeight/(WrapperHeight + GetScrollBarWidth () -1));
        }
    }

    var ScaleText = 'scale(' + ScaleRatio.toString().replace(',','.') + ')';

    //Chrome and Safari
        Wrapper.style.webkitTransform = ScaleText;
    //Firefox
        Wrapper.style.MozTransform = ScaleText;
    //Internet Explorer
        Wrapper.style.msTransform = ScaleText;
    //Opera
        Wrapper.style.OTransform = ScaleText;
    //Standard
        Wrapper.style.transform = ScaleText;
}

function GetScrollBarWidth ()
{
    var inner = document.createElement('p');
    inner.style.width = '100%';
    inner.style.height = '200px';

    var outer = document.createElement('div');
    outer.style.position = 'absolute';
    outer.style.top = '0px';
    outer.style.left = '0px';
    outer.style.visibility = 'hidden';
    outer.style.width = '200px';
    outer.style.height = '150px';
    outer.style.overflow = 'hidden';
    outer.appendChild (inner);

    document.body.appendChild (outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild (outer);
    return (w1 - w2);
}