var dbPromise = idb.open("football", 1, upgradeDb => {
    if (!upgradeDb.objectStoreNames.contains("teams")) {
        upgradeDb.createObjectStore("teams");
    }
});

// add fav team info
const addFavTeam = ({ id, crestUrl, shortName, name, venue, founded, website }) => {
    dbPromise
        .then(db => {
            let tx = db.transaction('teams', 'readwrite');
            let store = tx.objectStore('teams');
            let item = {
                id: id,
                crestUrl: crestUrl,
                shortName: shortName,
                name: name,
                venue: venue,
                founded: founded,
                website: website
            };
            store.put(item, id);
            return tx.complete;
        })
        .then(() => {
            M.toast({ html: `${name} added` });
            console.log('Success saving your team.');
        })
        .catch(() => console.log('Failed saving your team.'));
    getTeams();
}

// delete team from favorite
const deleteTeam = id => {
    dbPromise
        .then(db => {
            let tx = db.transaction('teams', 'readwrite')
            let store = tx.objectStore('teams')
            store.delete(id)
            return tx.complete
        })
        .then(() => {
            M.toast({ html: `${name} deleted` });
            console.log('Delete Team Success.');
            getSavedTeams();

        })
}

//get all fav team in db
const getFavTeam = () => {
    return dbPromise
        .then(db => {
            let tx = db.transaction('teams', 'readonly')
            let store = tx.objectStore('teams')
            return store.getAll()
        })
        .then(teams => teams)
}


function cekFav(id) {
    dbPromise.then(function(db) {
        var tx = db.transaction('teams', 'readonly');
        var store = tx.objectStore('teams');
        return store.get(parseInt(id));
    }).then(function(val) {
        if (val != null && val.id == id) {
            if (val.id == id) {
                var x = document.getElementById("checked" + id);
                x.innerHTML = `
                <button type="button" class="btn waves-circle waves-light btn-floating btn-small grey">
                <i class="large material-icons" style="color: cyan darken-5">check</i>
                </button>
                `;
            }
        }
    });
}