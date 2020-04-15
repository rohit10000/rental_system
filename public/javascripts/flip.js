const ele = document.getElementById('login');

function setText() {
    fetch('/server/getId')
        .then(res => res.json())
        .then(data => {

            if (data.status == 200) {
                ele.innerText = 'logout';
                ele.setAttribute('onclick', function () {
                    fetch('/auth/logout')
                        .then(res => res.json())
                        .then(data => console.log(data));
                });

            }
            else {
                ele.innerText = 'login';
                ele.setAttribute('onclick', "document.getElementById('id02').style.display='block'");

            }
        });
}

setText();

ele.addEventListener('click', function () {
    fetch('/server/getId')
        .then(res => res.json())
        .then(data => {
            if (data.status == 200) {
                fetch('/auth/logout')
                    .then(res => res.json())
                    .then(data => console.log(data));
                ele.innerText = 'login';
                ele.setAttribute('onclick', "document.getElementById('id02').style.display='block'");
            }
        });
});