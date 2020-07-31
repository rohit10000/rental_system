const house_app = document.getElementById('house_info');
const nav_tab_app = document.getElementById('flatNavTab');
const nav_content_app = document.getElementById('navContent');

const rent_id = localStorage.getItem('rent_id');

function logFunction(flat_id){
    fetch('/server/getUserId')
        .then(res => res.json())
        .then(data => {
            if(data.status == 200){
                fetch(`/user/${data.user_id}`)
                    .then(res => res.json())
                    .then(user_info =>{

                        var rent = user_info.rent_id;
                        var flat = user_info.flat_id;
                        var flag=0;

                        for(var j=0; j<flat.length; j++){
                            if(flat[j] == flat_id)
                                flag = 1;
                        }
                        if(flag){
                            alert("You have already saved this in you logs!!");
                        }else{
                            rent.push(rent_id);
                            flat.push(flat_id);

                            console.log(rent);
                            console.log(flat);

                            fetch(`/user/${data.user_id}`, {
                                method: 'PUT',
                                body: JSON.stringify({
                                    rent_id: rent,
                                    flat_id: flat
                                }),
                                headers: {
                                    'Content-type': 'application/json'
                                }
                            })
                                .then(res => res.json())
                                .then(data => console.log(data));

                            document.location.href = '/confirmation.html';
                        }
                    });
            }
            else{
                alert("You are not logged in !!");
            }
        });
}

fetch(`/rents/${rent_id}`)
    .then(res => res.json())
    .then(data => {
        var property = ["owner_name", "address", "description", "max_slot", "booked_slot"];
        for(var i=0; i<property.length; i++){
            const ele = document.createElement('dt');
            ele.setAttribute('class', 'col-6');
            ele.textContent = property[i];

            house_app.appendChild(ele);

            const value = document.createElement('dd');
            value.setAttribute('class', 'col-6');
            value.textContent = data[property[i]];

            house_app.appendChild(value);
        }

        var flats = data["flat"];

        for(var i=0; i<flats.length; i++){

            //nav-link

            const li = document.createElement('li');
            li.setAttribute('class', 'nav-item');
            console.log("#"+flats[i].name)
            const a = document.createElement('a');
            a.setAttribute('href', "#"+flats[i].name);
            a.setAttribute('role', 'tab');
            a.setAttribute('data-toggle', 'tab');
            if(i == 0)
                a.setAttribute('class', 'nav-link active');
            else
                a.setAttribute('class', 'nav-link');
            a.textContent = flats[i].name;

            li.appendChild(a);
            nav_tab_app.appendChild(li);

            //nav-content
            const div = document.createElement('div');
            div.setAttribute('class', '');
            if(i == 0)
                div.setAttribute('class', 'tab-pane fade show active');
            else
                div.setAttribute('class', 'tab-pane fade');

            div.setAttribute('id', `${flats[i].name}`);

            const h2 = document.createElement('h2');
            h2.textContent = flats[i].name;
            h2.appendChild(div)

            const inner_div1 = document.createElement('div');

            div.appendChild(inner_div1);

            for(property in flats[i]){
                const p = document.createElement('p');
                p.textContent = `${property}: ${flats[i][property]}`;
                inner_div1.appendChild(p);
            }
            const br = document.createElement('br');
            div.appendChild(br);
            const inner_div2 = document.createElement('div');
            inner_div2.setAttribute('class', 'row');

            const btn1 = document.createElement('button');
            btn1.setAttribute('class', 'btn btn-danger col-4 col-md-3 offset-md-1');

            btn1.setAttribute('onclick', "logFunction('" + flats[i]._id + "')");

            btn1.textContent = "Save for Later";
            inner_div2.appendChild(btn1);
            div.appendChild(inner_div2);

            nav_content_app.appendChild(div);
        }

        var location = { lat: data.latitude, lng: data.longitude };
        var map = new google.maps.Map(document.getElementById("house_map"), {
            zoom: 18,
            center: location
        });
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: "../images/blue-dot.png"
        });
    });

//map insertion

// function initMap() {
//     var location = { lat: 25.3176, lng: 82.9739 };
//     var map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 10,
//         center: location
//     });
//
//     function setmarker(base_map, data) {
//         let icon;
//         if(data.booked_slot < data.max_slot)
//             icon = "../images/red-dot.png";
//         else
//             icon = "../images/blue-dot.png";
//
//         console.log(data.booked_slot);
//         console.log(data.max_slot);
//
//         var marker = new google.maps.Marker({
//             position: {
//                 lat: data.latitude,
//                 lng: data.longitude
//             },
//             map: base_map,
//
//             icon: icon
//         });
//
//         var infowindow = new google.maps.InfoWindow({
//             content: data.description
//         });
//         google.maps.event.addListener(marker, "mouseover", function () {
//             infowindow.open(base_map, marker);
//         });
//         google.maps.event.addListener(marker, "mouseout", function () {
//             infowindow.close(base_map, marker);
//         });
//
//         google.maps.event.addListener(marker, "click", function () {
//             if(data.booked_slot < data.max_slot) {
//                 localStorage.setItem('rent_id', data._id);
//                 document.location.href = 'house.html';
//             }
//         });
//
//     }
//     fetch('/rents')
//         .then(res => res.json())
//         .then(data => {
//             data.forEach(rent => {
//                 setmarker(map, rent);
//             });
//         });
// }


// <dt class="col-6">Started</dt>
//     <dd class="col-6">14 Jun. 2020</dd>
// <dt class="col-6">Status</dt>
//     <dd class="col-6">Available</dd>
//     <dt class="col-6">Team size</dt>
// <dd class="col-6">2</dd>
// app.setAttribute('class', 'container');
//
//
// const div = document.createElement('div');
//
// div1.setAttribute('id', 'rentInfo');
// div1.setAttribute('class', 'row');
// div2.setAttribute('id', 'button');
// div2.setAttribute('class', 'row');
//
// const hr = document.createElement('hr');
//
// app.appendChild(div1);
// app.appendChild(hr);
// app.appendChild(div2);
// app.appendChild(hr);
// app.appendChild(div3);
// //constructed document structure
//
// const p = document.createElement('p');
// div3.appendChild(p);
// p.textContent = '';
//
// const btn1 = document.createElement('button');
// const btn2 = document.createElement('button');
//
// btn1.setAttribute('class', 'btn btn-info');
// btn1.textContent = 'Confirm booking';
//
// btn2.setAttribute('class', 'btn btn-warning');
// btn2.textContent = 'Cancel';
// btn2.setAttribute('onclick', 'window.location.href = "/index.html";');
//
// div2.appendChild(btn1);
// div2.appendChild(btn2);
//
// //end of second div
//
// const h1 = document.createElement('h1');
// h1.textContent = '';
// h1.style.display = 'none';
// div3.appendChild(h1);
//
// btn1.addEventListener('click', function () {
//     var user_id;
//     fetch('/server/getId')
//         .then(res => res.json())
//         .then(data => {
//
//             if (data.status == 200) {
//                 user_id = data.user_id;
//
//                 fetch(`/rents/${id}`)
//                     .then(res => res.json())
//                     .then(data => {
//                         // var user_id = h1.textContent;
//
//                         if (data.booked_slot < data.max_slot) {
//                             var tenants = data.tenant_id;
//                             var flag = 0;
//                             for (var i = 0; i < tenants.length; i++) {
//                                 if (tenants[i] == user_id) {
//                                     flag = 1;
//                                     break;
//                                 }
//                             }
//                             if (flag)
//                                 p.textContent = 'You have already booked this rent';
//                             else {
//                                 tenants.push(user_id);
//                                 var c = data.booked_slot + 1;
//                                 p.textContent = id;
//                                 fetch(`/rents/${id}`, {
//                                     method: 'PUT',
//                                     body: JSON.stringify({
//                                         tenant_id: tenants,
//                                         booked_slot: c
//                                     }),
//                                     headers: {
//                                         'Content-type': 'application/json'
//                                     }
//                                 })
//                                     .then(res => res.json())
//                                     .then(data => console.log(data));
//
//                                 document.location.href = '/confirmation.html';
//                             }
//                         }
//                         else {
//                             p.textContent = 'Rent is completely booked.';
//                         }
//
//                     });
//
//             }
//             else {
//                 p.textContent = 'You are not logged in!';
//             }
//         });
// });
//
// fetch(`/rents/${id}`)
//     .then(res => res.json())
//     .then(data => {
//         const card = document.createElement('div');
//         card.setAttribute('class', 'card');
//         div1.appendChild(card);
//
//         for (var property in data) {
//             const p = document.createElement('p');
//             p.textContent = `${property}: ${data[property]}`;
//             card.appendChild(p);
//         }
//         fetch(`/rents/${id}/images`)
//             .then(res => res.json())
//             .then(data => {
//
//                 var files = data.images;
//                 files.forEach(file => {
//
//                     const card = document.createElement('div');
//                     card.setAttribute('class', 'card');
//                     div1.appendChild(card);
//                     var image_path = '../images/' + id + '/' + file;
//
//                     const img = document.createElement('IMG');
//                     img.setAttribute("src", image_path);
//                     img.setAttribute("width", "304");
//                     img.setAttribute("height", "228");
//
//                     card.appendChild(img);
//                     card.appendChild(p);
//
//                 });
//
//             });
//
//     });
