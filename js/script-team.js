let apiKey = "008ab88c33c608495d5ac03d1f1a3a23248c2b058e502a5003ebc167ea767ea7";
let teamID = 0; 
let leagueId = 99

addEventListener("load", () => {
  var query = location.search.slice(1);
  var values = query.split("&");

  teamID = values[0].split("=")[1]
  leagueId = values[1].split("=")[1]

  fetch(
    `https://apiv3.apifootball.com/?action=get_teams&league_id=${leagueId}&team_id=${teamID}&APIkey=${apiKey}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      var playersTeam = data[0].players;
      
      leagueName.innerHTML = sessionStorage.getItem('league').toUpperCase()

      playersTeam.forEach((p) => {
        // Verificar se a foto foi carregada ou não
        let urlImagePlayer;
        let image = new Image();
        image.src = p.player_image;
        image.onload = () => {
          urlImagePlayer = p.player_image;
        };
        image.onerror = () => {
          urlImagePlayer =
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8mQZEK8yWW_HLrhFXAv_r1QlXmU0ZIJnrvw&usqp=CAU";
        };

        setTimeout(() => {
          listarJogadores.innerHTML += `
          <div class="square-player">

            <div class="top-player">
              <div class="image">
                <div class="border-image">
                  <img src="${urlImagePlayer}" alt="">
                </div>
              </div>

              <div class="player-info">

                <div class="line-stats">
                  <p>Nome</p>
                  <div class="json-input">
                    <p>${p.player_name}</p>
                  </div>
                </div>

                <div class="line-stats">
                  <p>Posição</p>
                  <div class="json-input">
                    <p>${p.player_type}</p>
                  </div>
                </div>

                <div class="line-stats-row">

                  <div class="square-line">
                    <p>Nº Camisa</p>
                    <div class="json-input">
                      <p>${p.player_number == '' ? '~' : p.player_number}</p>
                    </div>
                  </div>

                  <div class="square-line">
                    <p>Idade</p>
                    <div class="json-input">
                      <p>${p.player_age}</p>
                    </div>
                  </div>
                
                </div>

              </div>

            </div>

            <div class="stats-player">

              <div class="square-stats">
                <p>PJ</p>
                <div class="square-data">
                  <h1>${p.player_match_played}</h1>
                </div>
              </div>

              <div class="square-stats">
                <p>Gols</p>
                <div class="square-data">
                  <h1>${p.player_goals}</h1>
                </div>
              </div>

              <div class="square-stats">
                <p>Assis.</p>
                <div class="square-data">
                  <h1>${p.player_assists}</h1>
                </div>
              </div>

            </div>

          </div>`;

        }, 2000);

      });
    })
    .catch((error) => {
      console.error(`ERROR ==========> ${error}`);
    });



  fetch(
    `https://apiv3.apifootball.com/?action=get_standings&league_id=${leagueId}&APIkey=${apiKey}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      listarStats.innerHTM= ''
      data.forEach((t) => {
        if (t.team_id == teamID) {
          listarStats.innerHTML += `
          <div class="header">

            <div class="image">
              <img src="${t.team_badge}" alt="">
            </div>

            <div class="content">

              <div class="pos">
                <div class="square">
                  <div class="top"><p>Pos</p></div>
                  <div class="content">
                    <h1>${t.overall_league_position}</h1>
                  </div>
                </div>
              </div>

              <div class="datas">
                <div class="square">
                  <div class="top"><p>PTS</p></div>
                  <div class="content">
                    <h1>${t.overall_league_PTS}</h1>
                  </div>
                </div>

                <div class="square">
                  <div class="top"><p>PJ</p></div>
                  <div class="content">
                    <h1>${t.overall_league_payed}</h1>
                  </div>
                </div>

                <div class="square">
                  <div class="top"><p>V</p></div>
                  <div class="content">
                    <h1>${t.overall_league_W}</h1>
                  </div>
                </div>

                <div class="square">
                  <div class="top"><p>E</p></div>
                  <div class="content">
                    <h1>${t.overall_league_D}</h1>
                  </div>
                </div>

                <div class="square">
                  <div class="top"><p>D</p></div>
                  <div class="content">
                    <h1>${t.overall_league_L}</h1>
                  </div>
                </div>

                <div class="square">
                  <div class="top"><p>GF</p></div>
                  <div class="content">
                    <h1>${t.overall_league_GF}</h1>
                  </div>
                </div>

                <div class="square">
                  <div class="top"><p>GS</p></div>
                  <div class="content">
                    <h1>${t.overall_league_GA}</h1>
                  </div>
                </div>
              </div>

            </div>
  
          </div>`;

        }
      });
    })
    .catch(() => {
      console.log("Não funcionou");
    });
});
