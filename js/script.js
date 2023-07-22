const btnTabela = document.getElementById('btnTabela')
btnTabela.addEventListener("click", () => {
  fetch("https://apiv3.apifootball.com/?action=get_standings&league_id=99&APIkey=008ab88c33c608495d5ac03d1f1a3a23248c2b058e502a5003ebc167ea767ea7")
    .then((resp) => resp.json())
    .then(function (resp) {
      console.log(resp);

      resp.forEach((t) => {
        listagem.innerHTML += ` <a href="./team.html?team_id=${t.team_id}">${t.team_name} </a>
           <img src="${t.team_badge}" width="20px" height="20px"> -
           Pos: ${t.overall_league_position} -
           Pontos: ${t.overall_league_PTS}
           <br>
         `;
      });
    })
    .catch(() => {
      console.log("Não funcionou");
    });
});





// Key == 008ab88c33c608495d5ac03d1f1a3a23248c2b058e502a5003ebc167ea767ea7
// Brasileiro = 99