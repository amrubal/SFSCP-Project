function initializeTimeArray(arr){
    // Initialize timearray to empty array
    let timearray = [];

    // Loop and add zero into each interval
    for (let i = 0; i < (finalEndTime-finalStartTime)*interval*5; i++)
    {
        timearray[i] = 0;
    }
    return timearray;
}

function addArray(arr1, arr2){
    function addArrDiffLen(arr1, arr2){
        let shorter = arr1.length > arr2.length ? arr2 : arr1
        let lengthier = arr1.length > arr2.length ? arr1 : arr2

        let counter = 0;
        let result = [];

        while (counter < shorter.length){
            // If counter is less than shorter's length
            // Then just add them two arrays normally
            result[counter] = arr1[counter] + arr2[counter];
            counter++;
        }

        while (counter < lengthier.length){
            result[counter] = lengthier[counter];
            counter++;
        }

        return result;
    }

    return arr1.length === arr2.length
           ? arr1.map((number, id) => number + arr2[id])
           : addArrDiffLen(arr1, arr2); 
}

function detectConflict(class1, class2){
    let sum = addArray(class1, class2);
    return Math.max(...sum) === 2 ? true : false;
}

//function to take in multiple classes
function addEventToArray(startDate, endDate, day)
{
    let timearray = initializeTimeArray();
    //hours of event time substracted by start time multiplied by intervals between every hour
    let startTime = (startDate.getHours()-finalStartTime)*interval
    switch(startDate.getMinutes()) {
        case 00:
            break;
        case 30:
            startTime += 1;
            break;
    }
    //document.write(starttime)

    let endTime = (endDate.getHours()-finalStartTime)*interval
    switch(endDate.getMinutes()) {
        case 00:
            break;
        case 30:
            endTime += 1;
            break;
    }
    //document.write(endtime)

    //determine where all the days are at in the event array
    let x = 0;
    switch(day) {
        case 'Monday':
            break;
        case 'Tuesday':
            x += 12 * interval;
            break;
        case 'Wednesday':
            x += 12 * (interval + 2);
            break;
        case 'Thursday':
            x += 12 * (interval + 4);
            break;
        case 'Friday':
            x+= 12 * (interval + 6);
            break;
    }
    //document.write(x);

    for (let i = startTime + x; i < endTime + x; i++)
    {
        timearray[i] += 1;
    }
    return timearray;
}

// Create new Timetable instance
let timetable = new Timetable();

// Set the time from 9AM to 9PM
const finalStartTime = 9;
const finalEndTime = 21;
const interval = 2; //  1 hour / 30 minutes = 2 x 30mins interval each hour

timetable.setScope(finalStartTime, finalEndTime)

// Set the rows headers
timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

//test with event above
const day = new Date(2021,7,17,10,00);
const day2 = new Date(2021,7,17,11,00);

const day3 = new Date(2021,7,17,19,00);
const day4 = new Date(2021,7,17,19,30);

// Time : 1pm - 2pm in string -> new Date(2021,7,17,19,00);
// function (date1, date2) => true or false 
let day_type = 'Monday'
timetable.addEvent('test 1', day_type, day, day2, {url: "google.com"}, {class: 'vip'}); // options attribute is not used for this event

let test1 = addEventToArray(day, day2, day_type);
//let test2 = addEventToArray(day3, day4);
document.write(test1);
//document.write("<br>");
//document.write(test2);
//document.write("<br>");
//document.write(addArray(test1, test2));
//document.write("<br>");
//document.write(detectConflict(test1, test2));






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