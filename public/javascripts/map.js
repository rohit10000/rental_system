function initMap() {
	var location = { lat: 25.3176, lng: 82.9739 };
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 10,
		center: location
	});

	function setmarker(base_map, data) {
		let icon;
		if(data.booked_slot < data.max_slot)
			icon = "../images/red-dot.png";
		else
			icon = "../images/blue-dot.png";

		var marker = new google.maps.Marker({
			position: {
				lat: data.latitude,
				lng: data.longitude
			},
			map: base_map,

			icon: icon
		});

		var infowindow = new google.maps.InfoWindow({
			content: data.description
		});
		google.maps.event.addListener(marker, "mouseover", function () {
			infowindow.open(base_map, marker);
		});
		google.maps.event.addListener(marker, "mouseout", function () {
			infowindow.close(base_map, marker);
		});

		google.maps.event.addListener(marker, "click", function () {
			if(data.booked_slot < data.max_slot) {
				localStorage.setItem('rent_id', data._id);
				document.location.href = 'house.html';
			}
		});

	}
	fetch('/rents')
		.then(res => res.json())
		.then(data => {
			data.forEach(rent => {
				setmarker(map, rent);
			});
		});
}

