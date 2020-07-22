var base_url = "https://api.football-data.org/v2";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
    return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

//PreLoader: indikator loading
function preLoader() {
    var preLoader = `
    <div class="preloader-wrapper big active" style="position: relative; left: calc(50% - 30px); top:50%;">
    <div class="spinner-layer spinner-green-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
  `;
    document.getElementById("preLoader").innerHTML = preLoader;

}
// Request data json utk mengambil seluruh team
function getTeams() {
    preLoader();

    if ("caches" in window) {
        caches.match(`${base_url}/teams`).then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    var teamHTML = "";
                    data = data.teams
                    data.forEach(team => {
                        cekFav(team.id);

                        let imgUrl = team.crestUrl
                        if (imgUrl === null || imgUrl === "" || imgUrl === "http://upload.wikimedia.org/wikipedia/de/a/a9/Hull_City_AFC.svg" || imgUrl === "https://upload.wikimedia.org/wikipedia/en/d/d2/Nottingham_Forest_logo.svg") {
                            imgUrl = "img/icons/icon-512x512.png";
                        }

                        teamHTML += `
                      
                        <tr>
                        <td> <img src="${imgUrl.replace(/^http:\/\//i, 'https://')}" style="width: 40px;"></td>
                        <td>${team.shortName}</td>
                        <td>
                            <div id="checked${team.id}">
                                <button type="button" onclick="saveTeam(${team.id},'${team.crestUrl}','${team.shortName}','${team.name}','${team.venue}', '${team.founded}', '${team.website}')" class="btn waves-effect waves-circle waves-light btn-floating btn-small cyan darken-4 hoverable">
                                <i class="small material-icons">favorite_border</i>
                                </button>
                            </div>
                        </td>
                        </tr>
          
                        `;
                    });

                    document.getElementById("teams").innerHTML = teamHTML;
                    document.getElementById("preLoader").innerHTML = "";
                });
            }
        });
    }

    fetch(`${base_url}/teams`, {
            headers: {
                'X-Auth-Token': "ead49a5df02d4aa4a8645c20628b4e5f"
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            var teamHTML = "";
            data = data.teams
            data.forEach(team => {
                cekFav(team.id);

                let imgUrl = team.crestUrl
                if (imgUrl === null || imgUrl === "" || imgUrl === "http://upload.wikimedia.org/wikipedia/de/a/a9/Hull_City_AFC.svg" || imgUrl === "https://upload.wikimedia.org/wikipedia/en/d/d2/Nottingham_Forest_logo.svg") {
                    imgUrl = "img/icons/icon-512x512.png";
                }

                teamHTML += `             
                <tr>
                    <td> <img src="${imgUrl.replace(/^http:\/\//i, 'https://')}" style="width: 40px;"></td>
                    <td>${team.shortName}</td>
                    <td>
                
                        <div id="checked${team.id}">
                            <button type="button" onclick="saveTeam(${team.id},'${team.crestUrl}','${team.shortName}','${team.name}','${team.venue}', '${team.founded}', '${team.website}')" class="btn waves-effect waves-circle waves-light btn-floating btn-small cyan darken-4 hoverable">
                            <i class="small material-icons">favorite_border</i>
                            </button>
                        </div>
                    </td>
                </tr>


 
            `
            })
            document.getElementById("preLoader").innerHTML = "";
            document.getElementById("teams").innerHTML = teamHTML;
        })
        .catch(error);
}

// request data api utk menampilkan standings dgn id liga inggris
function getKlasemen() {
    preLoader();
    if ("caches" in window) {
        caches.match(`${base_url}/competitions/2021/standings`)
            .then(function(response) {
                if (response) {
                    response.json()
                        .then(function(data) {
                            var klasemenHTML = "";
                            data = data.standings[0].table
                            data.forEach(klasemen => {

                                klasemenHTML += `
                                <tr class="cyan lighten-5 black-text">
                                    <td class="cyan lighten-5 black-text"><b>${klasemen.position}</b></td>
                                    <td><img src="${klasemen.team.crestUrl}" onerror="errorUrl(this)" class="" width="60" ></td>
                                    <td class="cyan lighten-5 black-text" style="padding-top: 5px; padding-bottom: 5px; padding-left: 10px; padding-right: 10px;"><b>${klasemen.team.name}</b></td>
                                    <td>${klasemen.playedGames}</td>
                                    <td>${klasemen.won}</td>
                                    <td>${klasemen.draw}</td>
                                    <td>${klasemen.lost}</td>
                                    <td>${klasemen.goalsFor}</td>
                                    <td>${klasemen.goalsAgainst}</td>
                                    <td>${klasemen.goalDifference}</td>
                                    <td>${klasemen.points}</td>
                                </tr>
                                `
                            })
                            document.getElementById("klasemen").innerHTML = klasemenHTML;
                            document.getElementById("preLoader").innerHTML = "";
                        });
                }
            });
    }

    fetch(`${base_url}/competitions/2021/standings`, {
            headers: {
                'X-Auth-Token': "ead49a5df02d4aa4a8645c20628b4e5f"
            }
        })
        .then(status)
        .then(json)
        .then(function(data) {
            console.log(data);
            var klasemenHTML = "";
            data = data.standings[0].table
            data.forEach(klasemen => {
                klasemenHTML += `
                <tr class="cyan lighten-5 black-text">
                    <td class="cyan lighten-5 black-text"><b>${klasemen.position}</b></td>
                    <td><img src="${klasemen.team.crestUrl}" onerror="errorUrl(this)" class="" width="60" ></td>
                    <td class="cyan lighten-5 black-text" style="padding-top: 5px; padding-bottom: 5px; padding-left: 10px; padding-right: 10px;"><b>${klasemen.team.name}</b></td>
                    <td>${klasemen.playedGames}</td>
                    <td>${klasemen.won}</td>
                    <td>${klasemen.draw}</td>
                    <td>${klasemen.lost}</td>
                    <td>${klasemen.goalsFor}</td>
                    <td>${klasemen.goalsAgainst}</td>
                    <td>${klasemen.goalDifference}</td>
                    <td>${klasemen.points}</td>
                </tr>

              `
            })
            document.getElementById("klasemen").innerHTML = klasemenHTML;
            document.getElementById("preLoader").innerHTML = "";
        })
        .catch(error);
}