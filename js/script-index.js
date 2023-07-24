const apiKey =
  "008ab88c33c608495d5ac03d1f1a3a23248c2b058e502a5003ebc167ea767ea7";

addEventListener("load", () => {
  //Listagem da tabela
  fetch(
    `https://apiv3.apifootball.com/?action=get_standings&league_id=99&APIkey=${apiKey}`
  )
    .then((resp) => resp.json())
    .then(function (resp) {
      resp.forEach((t) => {
        listarTimes.innerHTML += ` 
          <a href="./team.html?team_id=${t.team_id}">
          <div class="line-team">

            <div class="pos">
              <h1>${t.overall_league_position}</h1>
            </div>

            <div class="name-team">
              <div class="image">
                <img src="${t.team_badge}" alt="">
              </div>
              <div class="name">
                <h1>${t.team_name}</h1>
              </div>
            </div>

            <div class="stats-team">
              <div class="stts">
                <p>${t.overall_league_PTS}</p>
                <p>|</p>
                <p>${t.overall_league_payed}</p>
                <p>${t.overall_league_W}</p>
                <p>${t.overall_league_D}</p>
                <p>${t.overall_league_L}</p>
              </div>
            </div>

          </div>
          </a>

         `;
      });
    })
    .catch(() => {
      console.log("Não funcionou");
    });

  //Listagem dos artilheiros
  var urlImagePlayer = [];
  fetch(
    `https://apiv3.apifootball.com/?action=get_topscorers&league_id=99&APIkey=${apiKey}`
  )
    .then((resp) => resp.json())
    .then(async (data) => {
      listarJogadores.innerHTML = "";
      for (var i = 0; i <= 5; i++) {
        await fetch(
          `https://apiv3.apifootball.com/?action=get_players&player_id=${data[i].player_key}&APIkey=${apiKey}`
        )
          .then((resp) => resp.json())
          .then((img) => {
            var image = new Image();
            image.src = img[0].player_image;
            image.onload = () => {
              urlImagePlayer.push(img[0].player_image);
            };
            image.onerror = () => {
              urlImagePlayer.push(
                `https://www.pngitem.com/pimgs/m/551-5510463_default-user-image-png-transparent-png.png`
              );
            };
          });
      }

      for (var ts = 0; ts < 5; ts++) {
        listarJogadores.innerHTML += `<div class="line-player">
              <div class="image">
                <img src="${urlImagePlayer[ts]}" alt="">
              </div>
      
              <div class="data-player">
                <div class="name">
                  <h1>${data[ts].player_name}</h1>
                </div>
      
                <div class="stats">
                  <p>${data[ts].goals}</p>
                  <p>|</p>
                  <p>${data[ts].assists > 0 ? data[ts].assists : 0}</p>
                </div>
              </div>
    
            </div>
          `;
      }
    })
    .catch((error) => {
      console.log(error);
    });

  // Listagem das rodadas
  var listRounds = () => {
    var date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let today = `${year}-${month + 1}-${day}`;
    console.log(today);

    //Pegar data de 7 dias atrás
    day -= 5;
    if (day < 1) {
      const lastDayMesPrevious = new Date(year, month, 0).getDate();
      day = lastDayMesPrevious + day;
      month--;
    }

    if (month < 0) {
      month = 11;
      year--;
    }
    // ========

    const date7DaysAgo = new Date(year, month, day);
    let sevenDaysAgo = `${date7DaysAgo.getFullYear()}-${
      date7DaysAgo.getMonth() + 1
    }-${date7DaysAgo.getDate()}`;

    fetch(
      `https://apiv3.apifootball.com/?action=get_events&from=${sevenDaysAgo}&to=${today}&league_id=99&APIkey=${apiKey}`
    )
      .then((resp) => resp.json())
      .then((data) => {
        let formattedOldDate = sevenDaysAgo.split("-");
        formattedOldDate = `${formattedOldDate[2]}/${formattedOldDate[1]}`;
        let formattedTodayDate = today.split("-");
        formattedTodayDate = `${formattedTodayDate[2]}/${formattedTodayDate[1]}`;

        dataRodada.innerHTML = `${formattedOldDate} a ${formattedTodayDate}`;
        listarRodada.innerHTML = "";

        data.forEach((m) => {
          listarRodada.innerHTML += `
        <div class="square-round">
          <div class="game">

            <div class="team">
              <img src="${m.team_home_badge}" alt="${m.match_hometeam_name}">
              <div class="line">
                <p>${m.match_hometeam_system}</p>
              </div>
            </div>

            <div class="result">
              <div class="scoreboard">
                <h1>${m.match_hometeam_score} x ${m.match_awayteam_score}</h1>
              </div>

              <div class="hour ${
                m.match_status == "Finished" ? "finished" : "pending"
              }">
                <h1>${m.match_time}</h1>
              </div>
    
            </div>

            <div class="team">
              <img src="${m.team_away_badge}" alt="${m.match_awayteam_name}">
              <div class="line">
                <p>${m.match_awayteam_system}</p>
              </div>
            </div>

          </div>

        </div>
        `;
        });
      })
      .catch((error) => {
        console.error(`ERROR ====> ${error}`);
      });
  };

  listRounds();
});
