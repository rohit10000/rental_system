
const app = document.getElementById('root');
app.setAttribute('class', 'container');


const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');

div1.setAttribute('id', 'rentInfo');
div1.setAttribute('class', 'row');
div2.setAttribute('id', 'button');
div2.setAttribute('class', 'row');
div3.setAttribute('class', 'row');

const hr = document.createElement('hr');

app.appendChild(div1);
app.appendChild(hr);
app.appendChild(div2);
app.appendChild(hr);
app.appendChild(div3);
//constructed document structure

const p = document.createElement('p');
div3.appendChild(p);
p.textContent = '';

const btn1 = document.createElement('button');
const btn2 = document.createElement('button');

btn1.setAttribute('class', 'btn btn-info');
btn1.textContent = 'Confirm booking';

btn2.setAttribute('class', 'btn btn-warning');
btn2.textContent = 'Cancel';
btn2.setAttribute('onclick', 'window.location.href = "/index.html";');

div2.appendChild(btn1);
div2.appendChild(btn2);

//end of second div
var id = localStorage.getItem('rent_id');

const h1 = document.createElement('h1');
h1.textContent = '';
h1.style.display = 'none';  
div3.appendChild(h1);

btn1.addEventListener('click', function () {
    fetch('/server/getId')
        .then(res => res.json())
        .then(data => {

            if (data.status == 200) {
                h1.textContent = data.user_id;

                fetch(`/rents/${id}`)
                    .then(res => res.json())
                    .then(data => {
                        var user_id = h1.textContent;

                        if (data.booked_slot < data.max_slot) {
                            var tenants = data.tenant_id;
                            var flag = 0;
                            for (var i = 0; i < tenants.length; i++) {
                                if (tenants[i] == user_id) {
                                    flag = 1;
                                    break;
                                }
                            }
                            if (flag)
                                p.textContent = 'You have already booked this rent';
                            else {
                                tenants.push(user_id);
                                var c = data.booked_slot + 1;
                                p.textContent = id;
                                fetch(`/rents/${id}`, {
                                    method: 'PUT',
                                    body: JSON.stringify({
                                        tenant_id: tenants,
                                        booked_slot: c
                                    }),
                                    headers: {
                                        'Content-type': 'application/json'
                                    }
                                })
                                    .then(res => res.json())
                                    .then(data => console.log(data));

                                document.location.href = '/confirmation.html';
                            }
                        }
                        else {
                            p.textContent = 'Rent is completely booked.';
                        }
                  
                    });

            }
            else {
                p.textContent = 'You are not logged in!';
            }
        });
});

fetch(`/rents/${id}`)
    .then(res => res.json())
    .then(data => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        div1.appendChild(card);

        for (var property in data) {
            const p = document.createElement('p');
            p.textContent = `${property}: ${data[property]}`;
            card.appendChild(p);
        }
        fetch(`/rents/${id}/images`)
            .then(res => res.json())
            .then(data => {

                var files = data.images;
                files.forEach(file => {

                    const card = document.createElement('div');
                    card.setAttribute('class', 'card');
                    div1.appendChild(card);
                    var image_path = '../images/' + id + '/' + file;

                    const img = document.createElement('IMG');
                    img.setAttribute("src", image_path);
                    img.setAttribute("width", "304");
                    img.setAttribute("height", "228");

                    card.appendChild(img);
                    card.appendChild(p);

                });

            });

    });
