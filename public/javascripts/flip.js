const app = document.getElementById("flip");

fetch('/server/getUserId')
    .then(res => res.json())
    .then(data => {
        if(data.status == 200){
            const span_log = document.createElement('span');
            span_log.setAttribute('class', 'fa fa-book');
            span_log.setAttribute('style', 'padding-right: 15px');

            span_log.textContent = "Your Logs";

            span_log.onclick = function(){
                document.location.href = 'confirmation.html';
            };

            app.appendChild(span_log);

            const span_logout = document.createElement('span');
            span_logout.setAttribute('class', 'fa fa-sign-out');
            span_logout.textContent = "Logout";
            app.appendChild(span_logout);

            span_logout.onclick = function () {
                fetch('/auth/logout')
                    .then(res => res.json())
                    .then(data => console.log(data));

                document.location.href = 'index.html';
            };
        }
        else{
            app.setAttribute('data-toggle', 'modal');
            app.setAttribute('data-target', '#loginModal');

            const span = document.createElement('span');
            span.setAttribute('class', 'fa fa-sign-in');
            span.textContent = "Login";

            app.appendChild(span);
        }
    });