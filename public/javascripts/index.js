var modal_signup = document.getElementById('id01');
var modal_login = document.getElementById('id02');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal_signup) {
        modal_signup.style.display = "none";
    }
    if (event.target == modal_login) {
        modal_login.style.display = "none";
    }
}
//const app = document.getElementById('button');

//fetch('/server/getId')
//    .then(res => res.json())
//    .then(data => {
//        if (data.status == 200) {
//            const btn3 = document.createElement('button');
//            btn3.setAttribute('class', 'btn btn-success');
//            btn3.textContent = 'Your Booked Rent';
//            btn3.setAttribute('onclick', 'window.location.href = "/confirmation.html";')
//            app.appendChild(btn3);
//        }
//    });