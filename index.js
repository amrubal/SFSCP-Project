// Create new Timetable instance
let timetable = new Timetable();

// Set the time from 9 to 3
timetable.setScope(9,3)

// Set the rows headers
timetable.addLocations(['Rotterdam', 'Madrid', 'Los Angeles', 'London', 'New York', 'Jakarta', 'Tokyo']);

// Add blocks (with options) into timetable. 
timetable.addEvent('Sightseeing', 'Rotterdam', new Date(2015,7,17,9,00), new Date(2015,7,17,11,30), { url: '#' });
timetable.addEvent('Zumba', 'Madrid', new Date(2015,7,17,12), new Date(2015,7,17,13), { url: '#' });
timetable.addEvent('Zumbu', 'Madrid', new Date(2015,7,17,13,30), new Date(2015,7,17,15), { url: '#' });
timetable.addEvent('Lasergaming', 'London', new Date(2015,7,17,17,45), new Date(2015,7,17,19,30), { class: 'vip-only', data: { maxPlayers: 14, gameType: 'Capture the flag' } });
timetable.addEvent('All-you-can-eat grill', 'New York', new Date(2015,7,17,21), new Date(2015,7,18,1,30), { url: '#' });
timetable.addEvent('Hackathon', 'Tokyo', new Date(2015,7,17,11,30), new Date(2015,7,17,20)); // options attribute is not used for this event
timetable.addEvent('Tokyo Hackathon Livestream', 'Los Angeles', new Date(2015,7,17,12,30), new Date(2015,7,17,16,15)); // options attribute is not used for this event

// Add lunch event with onClick
timetable.addEvent('Lunch', 'Jakarta', new Date(2015,7,17,9,30), new Date(2015,7,17,11,45), { onClick: function(event) {
window.alert('You clicked on the ' + event.name + ' event in ' + event.location + '. This is an example of a click handler');
}});
timetable.addEvent('Cocktails', 'Rotterdam', new Date(2015,7,18,00,00), new Date(2015,7,18,02,00), { class: 'vip-only' });

// Render the timetable
var renderer = new Timetable.Renderer(timetable);
renderer.draw('.timetable');

// OPTIONAL Google Analytics
// (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
//     function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
//     e=o.createElement(i);r=o.getElementsByTagName(i)[0];
//     e.src='//www.google-analytics.com/analytics.js';
//     r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
//     ga('create','UA-37417680-5');ga('send','pageview');