const app = document.getElementById('root');
app.setAttribute('class', 'container');


const div1 = document.createElement('div');
const div2 = document.createElement('div');
const div3 = document.createElement('div');

div1.setAttribute('id', 'rentInfo');
div1.setAttribute('class', 'row');
div2.setAttribute('id', 'button');
div2.setAttribute('class', 'row');
div3.setAttribute('id', 'rentInfo');
div3.setAttribute('class', 'row');

const hr = document.createElement('hr');

app.appendChild(div3);
app.appendChild(div1);
app.appendChild(hr);
app.appendChild(div2);

const h2 = document.createElement('h2');
h2.setAttribute('style', 'color: green; padding-left: 30px');
h2.textContent = 'Rent Booked';
div3.appendChild(h2);
//constructed document structure

const btn1 = document.createElement('button');
const btn2 = document.createElement('button');

btn1.setAttribute('class', 'btn btn-info');
btn1.textContent = 'Cancel booking';
btn2.setAttribute('class', 'btn btn-warning');
btn2.textContent = 'Go to Home';
btn2.setAttribute('onclick', 'window.location.href = "/index.html";');

div2.appendChild(btn1);
div2.appendChild(btn2);

//end of second div

const card = document.createElement('div');
card.setAttribute('class', 'card');
div1.appendChild(card);

var rent_id = localStorage.getItem('rent_id');

btn1.addEventListener('click', function () {
    fetch(`/rents/${rent_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            rentee_id: null
        }),
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => console.log(data));
    document.location.href = '/index.html';
});



fetch('/server/getId')
    .then(res => res.json())
    .then(data => {
        if (data.status == 200) {
            fetch(`/users/${data.user_id}`)
                .then(res => res.json())
                .then(data => {
                    for (var property in data) {
                        const p = document.createElement('p');
                        p.textContent = `${property}: ${data[property]}`;
                        card.appendChild(p);
                    }
                });

            fetch(`/rents/${rent_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    rentee_id: data.user_id
                }),
                headers: {
                    'Content-type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data =>console.log(data));

        }
        else {
            document.location.href = "/error.html";
        }
    });

