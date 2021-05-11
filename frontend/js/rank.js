async function saveRanking(userId, pontuacao, nivel) {
    let url = "http://localhost:8080/ranking";
    let rank = {
        "usuario": {
            "id": userId
        },
        "pontos": pontuacao,
        "nivel": nivel
    };

    axios.post(url, rank);
}