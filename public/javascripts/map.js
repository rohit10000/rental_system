const app = document.getElementById('root');
app.setAttribute('class', 'container');

const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');

div1.setAttribute('class', 'row heading');
div2.setAttribute('class', 'row');
div3.setAttribute('class', 'row footer');

const hr = document.createElement('hr');

app.appendChild(div1);
app.appendChild(hr);
app.appendChild(div2);
app.appendChild(hr);
app.appendChild(div3);
//constructed upper div structure

const div11 = document.createElement('div');
const div12 = document.createElement('div');
const div13 = document.createElement('div');

div11.setAttribute('class', 'col-xs-3');
div12.setAttribute('class', 'col-xs-4');
div13.setAttribute('class', 'col-xs-5');

div1.appendChild(div11);
div1.appendChild(div12);
div1.appendChild(div13);

const h2 = document.createElement('h2');
h2.textContent = 'Dreamt';
div11.appendChild(h2);

const br = document.createElement('br');
const p1 = document.createElement('p');
p1.textContent = '-find a dream place to live your dream.';

div12.appendChild(br);
div12.appendChild(br);
div12.appendChild(p1);

const btn1 = document.createElement('button');
const btn2 = document.createElement('button');
div13.appendChild(btn1);
div13.appendChild(btn2);

btn1.setAttribute('class', 'btn-info btn');
btn1.setAttribute('id', 'signup');
btn1.setAttribute('onclick', "document.getElementById('id01').style.display='block'");
btn1.textContent = 'Signup';

btn2.setAttribute('class', 'btn-danger btn');
btn2.setAttribute('id', 'login');
btn2.setAttribute('onclick', "document.getElementById('id02').style.display='block'");
btn2.textContent = 'Login';

//end of construction of upper div

const div21 = document.createElement('div');
div21.setAttribute('id', 'map');
div2.appendChild(div21);
//end of construction of middle div

const div31 = document.createElement('div');
const div32 = document.createElement('div');

div31.setAttribute('class', 'col-xs-6');
div32.setAttribute('class', 'col-xs-6');

div3.appendChild(div31);
div3.appendChild(div32);

const p2 = document.createElement('p');
p2.textContent = 'Copyright@rohit';
div31.appendChild(br);
div31.appendChild(p2);

const p3 = document.createElement('p');
p3.textContent = 'Developed by Rohit Singh.';

div32.appendChild(br);
div32.appendChild(p3);
//end of construction of last div


function initMap() {
	var location = { lat: 26.2183, lng: 78.1828 };
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 1,
		center: location
	});

	function setmarker(base_map, data) {

		var marker = new google.maps.Marker({
			position: {
				lat: data.latitude,
				lng: data.longitude
			},
			map: base_map
		});

		var infowindow = new google.maps.InfoWindow({
			content: data.description
		});
		google.maps.event.addListener(marker, "mouseover", function () {
			infowindow.open(base_map, marker);
		});

		google.maps.event.addListener(marker, "click", function () {
			localStorage.setItem('rent_id', data._id);
			document.location.href = 'house.html';
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

