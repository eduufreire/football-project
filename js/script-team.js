let apiKey = "008ab88c33c608495d5ac03d1f1a3a23248c2b058e502a5003ebc167ea767ea7";
let teamID = 0;

const btnListar = document.getElementById("listar");
btnListar.addEventListener("click", () => {
  var query = location.search.slice(1);
  var values = query.split("=");
  teamID = values[1];

  fetch(
    `https://apiv3.apifootball.com/?action=get_teams&league_id=99&team_id=${teamID}&APIkey=${apiKey}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      var playersTeam = data[0].players;

      playersTeam.forEach((p) => {
        // Verificar se a foto foi carregada ou não
        let urlImagePlayer;
        let image = new Image();
        image.src = p.player_image;
        image.onload = ()=>{urlImagePlayer = p.player_image};
        image.onerror = ()=>{urlImagePlayer = "https://th.bing.com/th/id/OIP.j8CGGV25mMnpdON3mRdDowHaE8?pid=ImgDet&rs=1"};

        setTimeout(() => {
          listarJogadores.innerHTML += 
          `${p.player_name} <img src="${urlImagePlayer}" width="25px" height="25px"> 
            <br>
            Idade: ${p.player_age} -- Nº Camisa: ${p.player_number}
            <br><br>
          `;
        }, 2000);
      });
    })
    .catch((error) => {
      console.error(`ERROR ==========> ${error}`);
    });

  fetch(
    `https://apiv3.apifootball.com/?action=get_standings&league_id=99&APIkey=${apiKey}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      data.forEach((t) => {
        if (t.team_id == teamID) {
          console.log(t)
          listarTudo.innerHTML += `${t.team_name}
           <img src="${t.team_badge}" width="20px" height="20px"> -
           Pos: ${t.overall_league_position} -
           Pontos: ${t.overall_league_PTS}
           <br>
          `;
        }
      });
    })
    .catch(() => {
      console.log("Não funcionou");
    });
});
