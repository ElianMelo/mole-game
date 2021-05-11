var users = [];

$(document).ready(function() {
    getUsers();
});

async function login() {
    let $user = $("#user").val();
    let $pwd = $("#pwd").val();
    let $form = $("#form");

    let login = false;

    if($user && $pwd) {
        await getUsers();

        users.forEach((el) => {
            if(el.user == $user && el.pwd == $pwd) {
                window.open(`game.html?id=${el.id}`, "_self");
                login = true;
                return;
            }
        })
        if(!login) {
            alert("falha no login");
        }
    } else {
        alert("Informar login e senha");
    }

    $form[0].reset();

}

async function register() {
    let $user = $("#user").val();
    let $pwd = $("#pwd").val();


    let register = true;

    await getUsers();

    users.forEach((el) => {
        if(el.user == $user && el.pwd == $pwd) {
            alert("falha no registro");
            register = false;
            return;
        }
    })

    if(register) {
        users.push({user: $user, pwd: $pwd});
        await setUsers($user, $pwd);
        alert("Registrado com sucesso");
    }
}

async function getUsers() {
    axios.get("http://localhost:8080/usuario")
        .then((response) => {
            users = response.data;
        })
}

async function setUsers($user, $pwd) {
    let data = {"user": $user, "pwd": $pwd};
    let url = "http://localhost:8080/usuario";
    axios.post(url, data).then(getUsers());
}