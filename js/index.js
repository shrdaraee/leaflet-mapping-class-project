// base map

var map = L.map("map", { center: [35.819065, 50.990982], zoom: 13 });

map.zoomControl.setPosition("topright");

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}", {
  foo: "bar",
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

//marker and popup

L.marker([35.819065, 50.990982]).addTo(map).bindPopup("مرکز کرج").openPopup();

//scale

L.control.scale({ position: "bottomright" }).addTo(map);

//fullscreen

var mapid = document.getElementById("map");
function fullScreenViwe() {
  mapid.requestFullscreen();
}

//map cordinate

map.on("mousemove", function (e) {
  $(".coordinate").html(
    "  عرض جغرافیایی:   " + e.latlng.lat + " /  طول جغرافیایی: " + e.latlng.lng
  );
});

//print1
$(".print-map").click(function () {
  window.print();
});

//print2
var browserControl = L.control
  .browserPrint({ position: "topright" })
  .addTo(map);

map.addControl(
  new L.Control.LinearMeasurement({
    unitSystem: "imperial",
    color: "#FF0080",
    type: "line",
  })
);

var current_position, current_accuracy;
map.on("locationfound", function (e) {
  // if position defined, then remove the existing position marker and accuracy circle from the map
  if (current_position) {
    map.removeLayer(current_position);
    map.removeLayer(current_accuracy);
  }
  var radius = e.accuracy;
  current_position = L.marker(e.latlng)
    .addTo(map)
    .bindPopup("دقت تقریبی: " + radius + " متر")
    .openPopup();
  current_accuracy = L.circle(e.latlng, radius).addTo(map);
});
map.on("locationerror", function (e) {
  alert(e.message);
});
// wrap map.locate in a function
function locate() {
  map.locate({ setView: true });
}

// show and pin markers

