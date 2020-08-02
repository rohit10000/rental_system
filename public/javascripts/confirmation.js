var app_ = document.getElementById('root');

function removeLogFunction(flat_id){
    fetch('/server/getUserId')
        .then(res => res.json())
        .then(data => {
            var user_id = data.user_id;
            fetch(`/user/${user_id}`)
                .then(res => res.json())
                .then(user_info =>{
                    var rent = user_info.rent_id;
                    var flat = user_info.flat_id;

                    var updated_flat =[], updated_rent=[];
                    for(var i = 0; i<rent.length; i++){
                        if(flat_id != flat[i]){
                            updated_flat.push(flat[i]);
                            updated_rent.push(rent[i]);
                        }
                    }

                    fetch(`/user/${user_id}`, {
                        method: 'PUT',
                        body: JSON.stringify({
                            rent_id: updated_rent,
                            flat_id: updated_flat
                        }),
                        headers: {
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => console.log(data));

                    document.location.href = '/confirmation.html';
                });
        });
}

fetch('/server/getUserId')
    .then(res => res.json())
    .then(data => {
        var user_id = data.user_id;
        fetch(`/user/${user_id}`)
            .then(res => res.json())
            .then(user_info =>{

                var rent = user_info.rent_id;
                var flat = user_info.flat_id;


                for(var j=0; j<rent.length; j++){
                    (function (k) {
                        fetch(`/rents/${rent[k]}`)
                            .then(res => res.json())
                            .then(rent_info => {

                                var media_div = document.createElement('div');
                                media_div.setAttribute('class', 'row well');
                                media_div.setAttribute('style', 'margin: 40px; ' +
                                    'margin-top:0px; background-color: #FEBD69;'+
                                    'padding: 20px; border-radius:3%; border-width: 4px; border-color: orange;' +
                                    'border-style: solid; box-shadow: 10px 10px 5px #aaaaaa;');

                                app_.appendChild(media_div);

                                var map_div = document.createElement('div');
                                map_div.setAttribute('class', 'col-12 col-md-5');
                                map_div.setAttribute('id',`map_div${k}`);
                                map_div.setAttribute('style', 'border-radius:5%; padding: 20px');

                                map_div.setAttribute('height', '250');
                                map_div.setAttribute('width', '300');


                                media_div.appendChild(map_div);

                                var body_div = document.createElement('div');
                                body_div.setAttribute('class', 'col-12 col-md body_div_log');

                                media_div.appendChild(body_div);

                                var h3 = document.createElement('h3');
                                h3.textContent = "Rent Information";
                                body_div.appendChild(h3);
                                var br = document.createElement('br');
                                body_div.appendChild(br);

                                var inner_div = document.createElement('div');
                                inner_div.setAttribute('class', 'row');

                                body_div.appendChild(inner_div);

                                //remove log button
                                var button_div = document.createElement('div');
                                button_div.setAttribute('class', 'row');
                                body_div.appendChild(button_div);

                                var btn1 = document.createElement('button');
                                btn1.setAttribute('class', 'btn btn-info col-4 col-md-3 offset-md-7');
                                btn1.setAttribute('onclick', "removeLogFunction('"+ flat[k] +"')");

                                btn1.textContent = "Remove Log";
                                button_div.appendChild(btn1);

                                var property_owner = ["owner_name", "address", "description", "max_slot", "booked_slot"];

                                for(var i=0; i<property_owner.length; i++){

                                    const ele = document.createElement('p');
                                    ele.setAttribute('class', 'col-6');
                                    ele.textContent = property_owner[i];

                                    inner_div.appendChild(ele);

                                    const value = document.createElement('p');
                                    value.setAttribute('class', 'col-6');
                                    value.textContent = rent_info[property_owner[i]];

                                    inner_div.appendChild(value);
                                }

                                var flats = rent_info.flat;
                                var flat_info;
                                for(var i=0; i<flats.length; i++){
                                    if(flats[i]._id == flat[k]){
                                        flat_info = flats[i];
                                    }
                                }

                                var property_flat = ["name", "price", "state"];

                                for(var i=0; i<property_flat.length; i++){

                                    const ele = document.createElement('p');
                                    ele.setAttribute('class', 'col-6');
                                    ele.textContent = property_flat[i];

                                    inner_div.appendChild(ele);

                                    const value = document.createElement('p');
                                    value.setAttribute('class', 'col-6');
                                    value.textContent = flat_info[property_flat[i]];

                                    inner_div.appendChild(value);
                                }

                                var location = { lat: rent_info.latitude, lng: rent_info.longitude };
                                console.log(`map_div${k}`);
                                var map = new google.maps.Map(document.getElementById(`map_div${k}`), {
                                    zoom: 16,
                                    center: location
                                });
                                var marker = new google.maps.Marker({
                                    position: location,
                                    map: map,
                                    icon: "../images/blue-dot.png"
                                });
                            });
                    })(j);

                }

            });
    });










// const app = document.getElementById('root');
// app.setAttribute('class', 'container');
//
//
// const div1 = document.createElement('div');
// const div2 = document.createElement('div');
// const div3 = document.createElement('div');
// const div4 = document.createElement('div');
//
// div1.setAttribute('id', 'rentInfo');
// div1.setAttribute('class', 'row');
// div2.setAttribute('id', 'button');
// div2.setAttribute('class', 'row');
// div3.setAttribute('id', 'rentInfo');
// div3.setAttribute('class', 'row');
//
// const hr = document.createElement('hr');
//
// app.appendChild(div3);
// app.appendChild(div1);
// app.appendChild(hr);
// app.appendChild(div2);
// app.appendChild(hr);
// app.appendChild(div4);
//
// const h2 = document.createElement('h2');
// h2.setAttribute('style', 'color: green; padding-left: 30px');
// h2.textContent = 'Rent Booked';
// div3.appendChild(h2);
// //constructed document structure
//
// const btn1 = document.createElement('button');
// const btn2 = document.createElement('button');
//
// btn1.setAttribute('class', 'btn btn-info');
// btn1.textContent = 'Cancel booking';
// btn2.setAttribute('class', 'btn btn-warning');
// btn2.textContent = 'Go to Home';
// btn2.setAttribute('onclick', 'window.location.href = "/index.html";');
//
// div2.appendChild(btn1);
// div2.appendChild(btn2);
//
// //end of second div
//
// const card = document.createElement('div');
// card.setAttribute('class', 'card');
// div1.appendChild(card);
//
// var rent_id = localStorage.getItem('rent_id');
//
// const h1 = document.createElement('h1');
// const p = document.createElement('p');
// h1.textContent = '';
// div4.appendChild(h1);
// div4.appendChild(p);
//
// btn1.addEventListener('click', function () {
//     fetch('/server/getId')
//         .then(res => res.json())
//         .then(data => {
//             if (data.status == 200) {
//
//                 h1.textContent = data.user_id;
//
//                 fetch(`/rents/${rent_id}`)
//                     .then(res => res.json())
//                     .then(data => {
//                         var tenants = data.tenant_id;
//                         var user_id = h1.textContent;
//                         var res = [];
//                         for (var i = 0; i < tenants.length; i++) {
//                             if (tenants[i] != user_id) {
//                                 res.push(tenants[i]);
//                             }
//                         }
//                         fetch(`/rents/${rent_id}`, {
//                             method: 'PUT',
//                             body: JSON.stringify({
//                                 tenant_id: res,
//                                 booked_slot: res.length
//                             }),
//                             headers: {
//                                 'Content-type': 'application/json'
//                             }
//                         })
//                             .then(res => res.json())
//                             .then(data => console.log(data));
//
//                         document.location.href = "/index.html";
//                     });
//             }
//             else {
//                 p.textContent = 'You are not logged in!';
//             }
//         });
//
// });
//
// fetch('/server/getId')
//     .then(res => res.json())
//     .then(data => {
//         if (data.status == 200) {
//             fetch(`/users/${data.user_id}`)
//                 .then(res => res.json())
//                 .then(data => {
//                     for (var property in data) {
//                         const p = document.createElement('p');
//                         p.textContent = `${property}: ${data[property]}`;
//                         card.appendChild(p);
//                     }
//                 });
//         }
//         else {
//             document.location.href = "/index.html";
//         }
//     });
//
