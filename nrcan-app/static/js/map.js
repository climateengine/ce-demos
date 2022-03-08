function initialize () {
    console.log("Map code")

    var map = L.map('map').setView([60.00, -96.00], 4);
    // token not needed in deployed version
    var token = '' //< your token here >

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 15
    }).addTo(map);

    map.on('click', function(e) {
        var newMarker = new L.marker(e.latlng).addTo(map);
        get_timeseries(e.latlng.lat,e.latlng.lng)
    });

    get_map();


    function open_model() {
        var modal = document.getElementById("chart-modal");
        var btn = document.getElementById("myBtn");
        var span = document.getElementsByClassName("close")[0];

        modal.style.display = "block";

        span.onclick = function() {
          $("#highchart").highcharts().destroy();
          modal.style.display = "none";
        }

    }

    function chart_it(data) {
        chart = Highcharts.chart('highchart', {
        chart: {
            zoomType: 'x',
            height: '480px'
        },
        title: {text: "NDVI"},
        yAxis: [
            {
                title: {
                    text: "NDVI",
                },
                height: '200px',
            },
        ],
        xAxis: {
            type: 'datetime',
            categories: data.map(date => {
                return Highcharts.dateFormat('%Y-%m-%d', new Date(date));
            }),

        },
        series:
        [
            {
                data: data,
                name: "NDVI",

            },
        ]

        });
    }


    function get_timeseries(lat, long) {
      console.log(lat, long)
      var response = $.ajax({
            type: "GET",
            // replace https://geodata.dri.edu with root deployed url
            // replace hardcoded parameters with desired parameters
            url: "https://geodata.dri.edu/timeseries/native/points?dataset=LANDSAT8_SR&variable=NDVI&area_reducer=mean&start_date=2018-04-01&end_date=2018-10-30&coordinates=%5B%5B"+long+"%2C"+lat+"%5D%5D",
            // headers are not needed with deployed version
            headers: {"Authorization": token},
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                open_model()
                values = []
                for (var i = 0; i < response[0].length; i++) {
                   value = response[0][i].NDVI
                   if (value == -9999)
                       value = 0
                   values.push([response[0][i].Date, value]);
                };

                chart_it(values)
            }
        });
    }

    function get_map() {

        var response = $.ajax({
            type: "GET",
            // replace https://geodata.dri.edu with root deployed url
            // replace hardcoded parameters with desired parameters
            url: "https://geodata.dri.edu/raster/mapid/values?dataset=LANDSAT8_SR&variable=NDVI&temporal_statistic=mean&start_date=2018-04-01&end_date=2018-10-30",
            // headers are not needed with deployed version
            headers: {"Authorization": token},
            dataType: 'json',
            contentType: "application/json",
            success: function (response) {
                map_it(response.tile_fetcher)
            }
        });
    }

    function map_it(tile_fetcher) {
        L.tileLayer(tile_fetcher, {
                    maxZoom: 15
        }).addTo(map);
    }
}
