// Create new Timetable instance
let timetable = new Timetable();

// Set the time from 9 to 3
const finalstarttime = 9;
const finalendtime = 21;
timetable.setScope(finalstarttime, finalendtime)

// Set the rows headers
timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

//12 hour array with 30 minute intervals initalized to zero
const timearray = [];
for (var i = 0; i < (finalendtime-finalstarttime)*2; i++)
{
    timearray[i] = 0;
}

//function to take in multiple classes
function addEventToArray(startdate, enddate)
{
    //hours of event time substracted by start time multiplied by intervals between every hour
    let starttime = (startdate.getHours()-finalstarttime)*2
    switch(startdate.getMinutes()) {
        case 00:
            break;
        case 30:
            starttime += 1;
            break;
    }
    //document.write(starttime)

    let endtime = (enddate.getHours()-finalstarttime)*2
    switch(enddate.getMinutes()) {
        case 00:
            break;
        case 30:
            endtime += 1;
            break;
    }
    //document.write(endtime)

    for (var i = starttime; i <= endtime; i++)
    {
        timearray[i] += 1;
    }
}


//test with event above
const day = new Date(2021,7,17,15,30);
const day2 = new Date(2021,7,17,18,00);
timetable.addEvent('test 1', 'Thursday', day, day2, {url: "google.com"}, {class: 'vip'}); // options attribute is not used for this event
addEventToArray(day, day2)



//print out array test
let text = timearray.toString();
document.write(text);

//random functions below
//const x = day.getMinutes();
//document.write(x);



// Add blocks (with options) into timetable. 
//timetable.addEvent('Lasergaming', 'Friday', new Date(2015,7,17,17,45), new Date(2015,7,17,19,30), { class: 'what', data: { maxPlayers: 14, gameType: 'Capture the flag' } });

// Add lunch event with onClick
//timetable.addEvent('Lunch', 'Monday', new Date(2015,7,17,9,30), new Date(2015,7,17,11,00), { onClick: function(event) {
//window.alert('You clicked on the ' + event.name + ' event in ' + event.location + '. This is an example of a click handler');
//}});

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