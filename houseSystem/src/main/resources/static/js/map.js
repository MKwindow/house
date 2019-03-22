
var map;
var zoom = 14;
function load(){
	var longitude = document.getElementById("mf_map:longitude").value;
	var latitude = document.getElementById("mf_map:latitude").value;
	if(GBrowserIsCompatible()){
		map = new GMap2(document.getElementById("MapDiv"));
		map.setCenter(new GLatLng(latitude,longitude),zoom);
		map.addControl(new GSmallMapControl());
		map.addControl(new GOverviewMapControl());
		map.addControl(new GScaleControl());
		map.enableScrollWheelZoom();
		point = new GLatLng(latitude,longitude);
		marker = new GMarker(point);
		map.setCenter(point,(map.getZoom()>13)?map.getZoom():13);
		map.addOverlay(marker);
	}
}