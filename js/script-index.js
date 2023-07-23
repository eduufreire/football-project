const apiKey =
  "008ab88c33c608495d5ac03d1f1a3a23248c2b058e502a5003ebc167ea767ea7";

const btnTabela = document.getElementById("btnTabela");
const btnRodadas = document.getElementById("btnRodadas");


        // <a href="./team.html?team_id=${t.team_id}">${t.team_name} </a>
        //    <img src="" width="20px" height="20px"> -
        //    Pos: ${t.overall_league_position} -
        //    Pontos: ${t.overall_league_PTS}
        //    <br></br>


addEventListener("load", () => {
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

});

// btnRodadas.addEventListener("click", () => {
//   var date = new Date();
//   let day = date.getDate();
//   let month = date.getMonth();
//   let year = date.getFullYear();
//   let today = `${year}-${month + 1}-${day}`;
//   console.log(today);

//   //Pegar data de 7 dias atrás
//   day -= 5;
//   if (day < 1) {
//     const lastDayMesPrevious = new Date(year, month, 0).getDate();
//     day = lastDayMesPrevious + day;
//     month--;
//   }

//   if (month < 0) {
//     month = 11;
//     year--;
//   }
//   // ========

//   const date7DaysAgo = new Date(year, month, day);
//   let sevenDaysAgo = `${date7DaysAgo.getFullYear()}-${
//     date7DaysAgo.getMonth() + 1
//   }-${date7DaysAgo.getDate()}`;

//   console.log(sevenDaysAgo);

//   fetch(
//     `https://apiv3.apifootball.com/?action=get_events&from=${sevenDaysAgo}&to=${today}&league_id=99&APIkey=${apiKey}`
//   )
//     .then((resp) => resp.json())
//     .then((data) => {
//       listRound.innerHTML = "";
//       data.forEach((m) => {
//         listRound.innerHTML += `<img src="${m.team_home_badge}" width="20px" height="20px"> ${m.match_hometeam_score} 
//         - 
//         <img src="${m.team_away_badge}" width="20px" height="20px"> ${m.match_awayteam_score} <br>
//         `;
//       });
//     })
//     .catch((error) => {
//       console.error(`ERROR ====> ${error}`);
//     });
// });

// addEventListener("load", ()=>{

//   fetch(`https://apiv3.apifootball.com/?action=get_topscorers&league_id=99&APIkey=${apiKey}`)
//   .then((resp) => resp.json())
//   .then((data)=>{

//     listTopSoccers.innerHTML = ''
//     data.forEach((ts)=>{
//       listTopSoccers.innerHTML +=
//       `Pos: ${ts.player_place} | Nome: ${ts.player_name} |
//        Gols: ${ts.goals} | Time: ${ts.team_name} <br>
//       `
//     })


//   })
//   .catch(
//     (error) => {console.log(error)}
//   )

// })
