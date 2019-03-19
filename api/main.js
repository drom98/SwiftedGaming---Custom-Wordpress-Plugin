const SEL_API = "https://api.sesl.ch/v1/";
const WP_API = "/SwiftedGaming/wp-json/";
const sportsPressEndpoint = "sportspress/v2/";

const standingsEndepoint = "https://api.sesl.ch/v1/tournaments/141/stages/201/standings";
async function fetchPositions() {
  const response = await fetch(standingsEndepoint);
  const result = await response.json();
  const teamData = result.data[1].teams;
  console.log(teamData);
  const thPoints = await document.querySelector(".data-w");
  console.log(thPoints);
  thPoints.textContent = "Points";
  const tbody = await document.querySelector("tbody").rows;
  console.log(tbody);
  for(let i = 0; i < tbody.length; i++) {
    tbody[i].cells[0].textContent = (i+1);
    tbody[i].cells[1].innerHTML = `<span class="team-logo"><img width="128" height="128" src="${teamData[i].logo}" class="attachment-sportspress-fit-icon size-sportspress-fit-icon wp-post-image" alt="" srcset="${teamData[i].logo} 128w, ${teamData[i].logo} 150w, ${teamData[i].logo} 300w, ${teamData[i].logo} 32w, ${teamData[i].logo} 500w" sizes="(max-width: 128px) 100vw, 128px"></span>`;
    tbody[i].cells[1].innerHTML += teamData[i].name;
    tbody[i].cells[2].textContent = teamData[i].points;
  }
}
fetchPositions();

//Fix CSS Bug
const variationEl = document.querySelector('.single-product.woocommerce div.product form.cart.variations_form');
variationEl.style.width = "320px";

//Premier Division - 0
//Challenger Division - 1
//Intermediate Division - 2
//Open Division - 3
async function insertTeams(season, division, league) {
  const response = await fetch(`${SEL_API}tournaments/${season}/stages/201/standings`);
  const teamsData = response.json();
  const teams = {
    title: [],
    leagues: [league],
    seasons: [season],
    status: 'publish'
  }

  teamsData.forEach(function(team) {
    teams.title = `team.data[${division}].teams.name`
  });

  const wpResponse = await fetch(`${WP_API}${sportsPressEndpoint}/teams`, {
    method: 'POST',
    headers: {
      "X-WP-Nonce": magicalData.nonce,
      "Content-Type": 'application/json'
    },
    body: JSON.stringify(teams)
  });
}

async function getTeamPlayersList(teamID) {
  const response = await fetch(`${SEL_API}teams/${teamID}/roster`);
  return response.json();
}

async function insertTeamPlayers(teamSEL_ID, teamWP_ID, leagues, seasons) {
  const players = await getTeamPlayersList(teamSEL_ID);
  const playersList = await players.data.members;
  playersList.forEach(data => {
    const playersData = {
      title: data.username,
      leagues: [
        leagues
      ],
      seasons: [
        seasons
      ],
      teams: [
        teamWP_ID
      ],
      current_teams: [
        teamWP_ID
      ],
      //status: 'publish'
    }
    const response = fetch(`${WP_API}${sportsPressEndpoint}players`, {
      method: 'POST',
      headers: {
        "X-WP-Nonce": magicalData.nonce,
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(playersData)
    });
  });
}

//insertTeamPlayers('70', '4877', '70', '72');

//Open Division : 367
//Challenger Division : 365
async function getSelMatches(division) {
  const response = await fetch(`${SEL_API}tournaments/141/stages/201/groups/${division}/matches`);
  return response.json();
}

async function addEvents() {
  const selMatches = await getSelMatches(365);
  const eventData = {
    date_gmt: [],
    status: 'publish',
    leagues: [],
    seasons: [],
    teams: [],
    outcome: [] 
  }
  for(let i = 0; i < selMatches.length; i++) {
    eventData = selMatches.data[i].matches[i].date;
  }
  const date = selMatches.data[0].matches[0].date;
  console.log(JSON.stringify(eventData));
}
