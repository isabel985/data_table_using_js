function loadData(apiData) {
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            $("#message").hide()
            $("#thead").show()

            var info = JSON.parse(this.responseText).MRData.StandingsTable.StandingsLists[0].DriverStandings;

            var table = $("#tbody")
            for (var i = 0; i < info.length; i++) {
                var name = info[i].Driver.givenName + " " + info[i].Driver.familyName
                table.append(`<tr><td>${info[i].position}</td><td>${info[i].wins}</td><td><a href=${info[i].Driver.url} target="_blank">${name}</a></td><td>${info[i].Driver.nationality}</td><td><a href=${info[i].Constructors[0].url} target="_blank">${info[i].Constructors[0].name}</a></td></tr>`);
            }
        }
    };

    var url = `https://ergast.com/api/f1/${apiData.year}/${apiData.season}/driverStandings.json`;
    xhttp.open("GET", url);
    xhttp.send();

};

$("#thead").hide()
$('#f1-form').on('submit', event => {
    event.preventDefault();
    var year = $('#year').val();
    var season = $('#season').val();

    var credentials = {
        year: year,
        season: season
    };

    loadData(credentials);
});