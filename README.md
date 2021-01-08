# Wanderlust #

![wanderlust app](https://i.ibb.co/b1d3fdG/wanderlust-screenshot.png "Wanderlust")

Many avid and prospectful travelers have a bucketlist "visionboard" or map of places they aspire to visit. Wanderlust replicates this visioboard with a map you can place a pin on. Along with this, you can add information to the pin such as your name, the name of the location, and the date you're imaginging visiting. A post generates that you or your friends can make notes and comment on.

* https://github.com/kosmos02/wanderlust-backend

## Technologies Used ##

* Ruby on Rails backend
* Vanilla Javascript frontend
* HTML
* CSS
* Leaflet.js package

## How to Use ##

## Startup ##

* Fork and clone github repo
* Open terminal of choice
* On backend run bundle update
* Backend make sure everything is migrated using rails db:migrate
* Run rails backend using rails s
* Make sure lite-server is installed frontend using lite-server
 ```
 npm install lite-server
```
* Run the following in terminal
```
$ npx lite-server
```

## Usage ##

* Pick a point on the map to throw a pin at your desired location
* Fill out the form data and hit submit
* You can delete the card that pops-up by clciking the 'x'
* You can post a message with your name on the card by filling out the form and clicking submit
* You can delete the message by clicking the 'x' next to the associated message

## Code Examples ##

To use leaflet in your app 
```
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>

<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
```
To render the map
```
let mymap = L.map('mapid').setView([31.819331, -32.309761], 2);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoia29zbW9zMDIiLCJhIjoiY2tqajBnbnQxNHp1ZTJzcGs2eGl2ZTB2OCJ9.sN_ykILGCbjf6ZkobZ80wg'
}).addTo(mymap);
```
To make a custom marker/pin
```
const pin = L.icon({
        iconUrl: "https://i.ibb.co/cvXDtCL/stand-pin.png",
    
        iconSize:     [50, 55], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [10, 54], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -63] // point from which the popup should open relative to the iconAnchor
    });

    let marker = L.marker([post.lat, post.lng], {icon: pin}).addTo(mymap);
}
```
To make a popup

```
let popup = L.popup(mymap.on('click', onMapClick);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    
    $lat.textContent = e.latlng.lat
    $lng.textContent = e.latlng.lng
})
```
## Demo ##

[![Wanderlust](https://i.ibb.co/VqfwzB2/Demo-Wanderlust.png)](https://youtu.be/9Lydq4EVUI4 "Wanderlust")

## Contributor ##

### Alexander Gabriel - on Github: @kosmos02

if you would like to contribute to this project to add more features to this app such as adding an API to gather location data upon click, such as city name and things to do there, adding a section to display location activities/funfacts/temperature data, adding a link such as skyscanner to direct you to flight booking information, or any other idea you may have, email me at alexandrgabe@gmail.com.
