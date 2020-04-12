let preloader = document.getElementById('preloader');
let date = new Date();

let url = window.location.toString();

let getUsername = (url) => {
    let urlArray = url.split('=');
    let userName = urlArray[1];
    if (userName === undefined){
        userName = 'johayo';
    }
    return userName;
}

let name = getUsername(url);

let getDate = new Promise((resolve, reject) => {
    setTimeout(() => date ? resolve(date) : reject ('Не найдено'), 5000)
});

let getUserDate = fetch('https://api.github.com/users/' + name);
    Promise.all([getUserDate, getDate])
    .then(([request, date]) => {
        requestInfo = request;
        requestDate = date;
    })
    .then(res => requestInfo.json())
    .then(json => {
        let avatar = json.avatar_url;
        let name = json.login;
        let bio = json.bio;
        let profile =json.html_url;
        if (name) {

            let addAvatar = () => {
                let newAvatar = document.createElement('img');
                newAvatar.src = avatar;
                let addString = document.createElement('br');
                document.body.appendChild(newAvatar);
                document.body.appendChild(addString);
            }

            let addBio = () => {
                let newBio = document.createElement('p');
                newBio.innerHTML = bio;
                document.body.appendChild(newBio);
            }

            let addProfile = () => {
                let elementForLink = document.createElement('a');
                let elementForHeader = document.createElement('h2');
                elementForHeader.innerText = name;
                elementForLink.href = profile;
                document.body.appendChild(elementForLink);
                elementForLink.appendChild(elementForHeader);
            }

            let addDate = () => {
                let newDate = document.createElement('p');
                newDate.innerHTML = requestDate;
                document.body.appendChild(newDate);
            }

            preloader.style.display = 'none';

            addProfile();
            addBio();
            addAvatar();
            addDate();
        }
        else {
            alert('Информация о пользователе не найдена')
        }
    })

    .catch(err => alert(err + ' Информация о пользователе не найдена'));