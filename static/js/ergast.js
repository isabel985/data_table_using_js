const loadData = (url, apiData) => {
    $.get(url, data => {

        if (!data.MRData.StandingsTable.StandingsLists[0] || !apiData.season == data.MRData.StandingsTable.StandingsLists[0]) {
            $("#thead").hide()
            $("#message").html("<br>No data for that year and season.")
            $("#message").show()
        } else if (apiData.year == data.MRData.StandingsTable.StandingsLists[0].season && apiData.season == data.MRData.StandingsTable.StandingsLists[0].round) {
            $("#message").hide()
            $("#thead").show()

            let info = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
            let table = $("#tbody");
            for (let i = 0; i < info.length; i++) {
                let name = info[i].Driver.givenName + " " + info[i].Driver.familyName
                table.append(`<tr><td>${info[i].position}</td><td>${info[i].wins}</td><td><a href=${info[i].Driver.url} target="_blank">${name}</a></td><td>${info[i].Driver.nationality}</td><td><a href=${info[i].Constructors[0].url} target="_blank">${info[i].Constructors[0].name}</a></td></tr>`);
            };
        };
    });
}

$("#thead").hide()

$('#f1-form').on('submit', event => {
    event.preventDefault();
    $("#tbody").empty();
    let year = $('#year').val();
    let season = $('#season').val();

    let credentials = {
        year: year,
        season: season
    };

    let url = `https://ergast.com/api/f1/${credentials.year}/${credentials.season}/driverStandings.json`;

    loadData(url, credentials);
});