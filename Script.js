mapboxgl.accessToken = 'pk.eyJ1IjoiY3lnbnVzMjYiLCJhIjoiY2s5Z2MzeWVvMGx3NTNtbzRnbGtsOXl6biJ9.8SLdJuFQzuN-s4OlHbwzLg';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/cygnus26/clsxl4mj500ba01pi1ioifd2s',
      center: [6, 52],
      zoom: 7
    });

    map.addControl(new mapboxgl.NavigationControl());

    // Add geolocate control to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
          positionOptions: {
              enableHighAccuracy: true
          },
          // When active the map will receive updates to the device's location as it changes.
          trackUserLocation: true,
          // Draw an arrow next to the location dot to indicate which direction the device is heading.
          showUserHeading: true
      })
  );

// Create a popup, but don't add it to the map yet.
const popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});

map.on('mouseenter', 'zerowater', (e) => {
  // Change the cursor style as a UI indicator.
  map.getCanvas().style.cursor = 'pointer';

  // Copy coordinates array.
  const coordinates = e.features[0].geometry.coordinates.slice();
  const description = e.features[0].properties.description;
  const score = e.features[0].properties.TDS;

  // Ensure that if the map is zoomed out such that multiple
  // copies of the feature are visible, the popup appears
  // over the copy being pointed to.
  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  }

  // Populate the popup and set its coordinates
  // based on the feature found.
  popup.setLngLat(coordinates).setHTML("<p>Total Dissolved Solids: <b>"+score+" mg/L </b></p> <p> Location:"+description).addTo(map);
});

map.on('mouseleave', 'zerowater', () => {
  map.getCanvas().style.cursor = '';
  popup.remove();
});



// // Closure
// (function() {
//   /**
//    * Decimal adjustment of a number.
//    *
//    * @param {String}  type  The type of adjustment.
//    * @param {Number}  value The number.
//    * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
//    * @returns {Number} The adjusted value.
//    */
//   function decimalAdjust(type, value, exp) {
//     // If the exp is undefined or zero...
//     if (typeof exp === 'undefined' || +exp === 0) {
//       return Math[type](value);
//     }
//     value = +value;
//     exp = +exp;
//     // If the value is not a number or the exp is not an integer...
//     if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
//       return NaN;
//     }
//     // If the value is negative...
//     if (value < 0) {
//       return -decimalAdjust(type, -value, exp);
//     }
//     // Shift
//     value = value.toString().split('e');
//     value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
//     // Shift back
//     value = value.toString().split('e');
//     return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
//   }

//   // Decimal round
//   if (!Math.round10) {
//     Math.round10 = function(value, exp) {
//       return decimalAdjust('round', value, exp);
//     };
//   }
//   // Decimal floor
//   if (!Math.floor10) {
//     Math.floor10 = function(value, exp) {
//       return decimalAdjust('floor', value, exp);
//     };
//   }
//   // Decimal ceil
//   if (!Math.ceil10) {
//     Math.ceil10 = function(value, exp) {
//       return decimalAdjust('ceil', value, exp);
//     };
//   }
// })();s
