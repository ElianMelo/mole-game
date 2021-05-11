const $levels = {"easy": 3,"medium":5,"hard":7};
const $imgWidth = 100; // largura da toupeira
const $imgHeight = 80; // altura da toupeira
const $imgsTheme = {"default": "buraco.gif", "active": "toupeira.gif", "dead": "morreu.gif"}
const $initialTime = 30;
var $timeGame = $initialTime; // Tempo de jogabilidade independente da fase
var $idChronoGame; // Ira controlar o setInterval do cronometro
var $idChronoStartGame; // Irá controlar o setInterval do jogo
var seconds = 0;
var minutes = 0;
var urlParams;
var userId;
var user;
var bestScore;

$(document).ready(async function() {
    urlParams = new URLSearchParams(window.location.search);
    userId = urlParams.get('id');

    await setInfos();

    fillBoard();
    $("#chrono").text(formatter($initialTime));
    $("#btnPlay").click(function(){
        btnCtrl("Play");
        $idChronoStartGame = setInterval(startGame, 1180); 
        $idChronoGame = setInterval(startChronoGame, 1000);
    });
    $("#btnPause").click(function(){
        stopGame();
    });
    $("#btnStop").click(function(){
        endGame();
    });
    $("#btnExit").click(function(){
        window.open("login.html", "_self")
    });
});

async function setInfos() {
    await getUser(userId).then(setUser);
    await getBestScore(userId).then(setBestScore);
    setUserInfo();
}

async function getUser(id) {
    return axios.get(`http://localhost:8080/usuario/${id}`);
}

async function getBestScore(id) {
    return axios.get(`http://localhost:8080/ranking/${id}/${getLevel(true)}`);
}

function setUser(response) {
    user = response.data.user;
}

function setBestScore(response) {
    bestScore = response.data.pontos;
}

function setUserInfo() {
    $("#userName").text(user);
    $("#bestScore").text(bestScore ? bestScore : 0);
}

function stopGame() {
    clearInterval($idChronoGame);
    clearInterval($idChronoStartGame);
    fillBoard();
    btnCtrl("Pause");
}

function btnCtrl(opc) {
    if(opc == "Play") {
        $("#btnPause").prop("disabled", false) // Habilita
        $("#btnStop").prop("disabled", false) // Habilita
        $("#btnPlay").prop("disabled", true) // Desabilitado
    } else if (opc == "Stop") {
        $("#btnPause").prop("disabled", true) // Desabilitado
        $("#btnStop").prop("disabled", true) // Desabilitado
        $("#btnPlay").prop("disabled", false) // Habilita
    }  else if (opc == "Pause") {
        $("#btnPause").prop("disabled", true) // Desabilitado
        $("#btnStop").prop("disabled", false) // Habilita
        $("#btnPlay").prop("disabled", false) // Habilita
    }
}

// Cria a moldura do tabuleiro do jogo conforme o nivel de dificuldade
function fillBoard() {
    setInfos();
    $level = getLevel();
    $boardWidth = $imgWidth * $level + 50;
    $boardHeight = $imgHeight * $level + 50;
    $("#board").css({"width":$boardWidth, "height":$boardHeight});
    placeHolesBoard($level);
}

// Insere os buracos das toupeiras no tabuleiro
function placeHolesBoard($level) {
    $("#board").html("");
    for($i = 0; $i < $level * $level; $i++) {
        $div = $("<div>");
        $img = $("<img>").attr({"src":`img/${$imgsTheme.default}`, "id":`mole_${$i+1}`, "style": "width:" + getRandNumber(50, 110) + "px"});
        $($img).click(function(){updateScore(this)});
        $div.append($img);
        $("#board").append($div);
    }
}

function updateScore($img) {
    $("section").css("cursor", "url('img/hammer2.png'), auto");
    setTimeout(() => {
        $("section").css("cursor", "url('img/hammer1.png'), auto");
    }, 500);

    if($($img).attr("src").search($imgsTheme.active) != -1) {  
        $("#score").html(Number($("#score").html()) + 1);
        $($img).attr("src", `img/${$imgsTheme.dead}`);
    }
}

function formatter($timeGame) {
    return $timeGame.toLocaleString("pt-br", {minimumIntegerDigits: 2});
}

function startChronoGame() {
    $timeGame -= 1;
    $secondsFormat = formatter($timeGame);
    ($timeGame >= 0)?$("#chrono").text($secondsFormat):endGame();
}

async function endGame() {
    clearInterval($idChronoGame);
    clearInterval($idChronoStartGame);
    let pontuacao = $("#score").text();
    await saveRanking(userId, pontuacao, getLevel(true));

    alertWifi(`<h1>Ranking</h1>${await rankingTable()} Fim de Jogo. Sua pontuação foi = ${pontuacao}`, false, 0, `img/${$imgsTheme.active}`, "20");    
    fillBoard();
    $("#score").text("0");
    $timeGame = $initialTime;
    $("#chrono").text(formatter($initialTime));
    btnCtrl("Stop");
    setInfos();
}

async function getRanking() {
    return axios.get(`http://localhost:8080/ranking/n=${getLevel(true)}`);
}

function wait(ms) {
    return new Promise( (resolve) => {setTimeout(resolve, ms)});
}

async function rankingTable() {
    let table = $("<table class='table table-dark rankingTable'>");
    let thead = $("<thead>");
    
    let tr = $("<tr>");
    let th1 = $("<th scope='col'>User</th>");
    let th2 = $("<th scope='col'>Score</th>");

    tr.append(th1);
    tr.append(th2);
    thead.append(tr);
    table.append(thead);

    tbody = $("<tbody>");

    await wait(500);

    let response = await getRanking();

    ranking = response.data;
    
    ranking.forEach((el) => {
        let tr = $("<tr>");
        let td1 = $("<td>");
        let td2 = $("<td>");
        td1.text(el.usuario.user);
        td2.text(el.pontos);
        tr.append(td1);
        tr.append(td2);
        tbody.append(tr);
    })

    table.append(tbody);

    return table[0].outerHTML;
}

function startGame() {
    fillBoard(); // Melhorar: trocar apenas a toupeira do tabuleiro pelo buraco ao inves do tabuleiro
    $level = getLevel();
    $randNumber = getRandNumber(1, Math.pow($level,2));
    $(`#mole_${$randNumber}`).attr("src", `img/${$imgsTheme.active}`);
}

// Gera um numero aleatorio entre "min" e "max"
function getRandNumber(min, max) {
    return Math.round((Math.random() * Math.abs(max - min)) + min);
}

// Retorna o nro corresponde ao nivel de dificuldade selecionado pelo usuario
function getLevel(isStr = false) {
    if(isStr) {
        return $("#level").val();
    }
    return $levels[$("#level").val()];
}