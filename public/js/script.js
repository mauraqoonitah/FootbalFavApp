const getSavedTeams = () => {
    preLoader();
    getFavTeam()
        .then(data => {
            let teamsHTML = "";
            data.forEach(team => {

                let imgUrl = team.crestUrl
                if (imgUrl === 'null' || imgUrl === "" || imgUrl === "http://upload.wikimedia.org/wikipedia/de/a/a9/Hull_City_AFC.svg" || imgUrl === "https://upload.wikimedia.org/wikipedia/en/d/d2/Nottingham_Forest_logo.svg") {
                    imgUrl = "img/icons/icon-512x512.png";
                }

                teamsHTML +=
                    `
                    <div class="col s12 m6 l4" style="font-size: smaller">
                    <div class="card horizontal" style="width: 100%; ">
                        <div class="section card-image waves-effect waves-block waves-light center-block cyan lighten-5">
                            <img src="${imgUrl.replace(/^http:\/\//i, 'https://')}" style="max-width: 80px; padding: 5px; left: 5px;">
                        </div>
                        <div class="section card-stacked cyan lighten-5">
                            <div class="card-content">
                                <span style="padding-bottom: 10px;font-size:1rem"><b>${team.shortName}</b></span><br>
                                <hr>
                                <span class="">${team.name}</span><br>
                                <span class="">Stadium: <b>${team.venue}</b></span><br>
                                </b>
                                </span><br><br>
                                <div class="center-block">
                                    <a href="${team.website}" target="_blank"> <i class="btn-flat small material-icons" style="color: #006064; display: inline-flex;
                        vertical-align: middle; font-size: 18px">language</i></a>
                
                                    <i class="btn-flat small material-icons" style="color: #006064; display: inline-flex;
                        vertical-align: middle; font-size: 18px " onclick="deleteFavTeam(${team.id},'${team.name}')">delete</i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        
           `
            })

            if (teamsHTML == "") {
                teamsHTML = `<p class="section center-block  grey-text center-align"><i>Add your favourite teams to see their latest result, next schedule and for one-click access to their page </i></p>


                   `;
            }
            document.getElementById("preLoader").innerHTML = "";
            document.getElementById('favorite-page').innerHTML = teamsHTML;

        })
}


const saveTeam = (id, crestUrl, shortName, name, venue, founded, website) => {

    addFavTeam({ id, crestUrl, shortName, name, venue, founded, website })
    showNotification(`see ${name} on favorite page.`)
    getTeams()

}

const deleteFavTeam = (id, name) => {
    let del = confirm(`delete ${name} from your favorite ?`)
    if (del) {
        deleteTeam(id)
        getSavedTeams()
        showNotification(`${name} deleted from your favorite.`)

    }

}