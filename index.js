import Course from './Course.js';
import courseArray from './data.js'

// Counter to get course from arr
let counter = 0;

// Create new Timetable instance
let timetable = new Timetable();

// Set the time from 6AM to 9PM
const finalStartTime = 6;
const finalEndTime = 21;
const interval = 2; //  1 hour / 30 minutes = 2 x 30mins interval each hour

timetable.setScope(finalStartTime, finalEndTime)

//  Set the rows headers
timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

// Intialize time array with 0s.
function initializeTimeArray(arr){
    // Initialize timearray to empty array
    let timearray = [];

    // Loop and add zero into each interval
    for (let i = 0; i < (finalEndTime-finalStartTime)*interval; i++)
    {
        timearray[i] = 0;
    }
    return timearray;
}

// Function to add two arrays.
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

// Logic to detect conflict between two courses
function detectConflict(class1, class2){
    let sum = addArray(class1, class2);
    return Math.max(...sum) === 2 ? true : false;
}

// Add a class into timetable
function addClass(course){
    function addEventToArray(startDate, endDate){
    let timearray = initializeTimeArray();
    //hours of event time substracted by start time multiplied by intervals between every hour
    let startTime = (startDate.getHours()-finalStartTime)*interval
    switch(startDate.getMinutes()) {
        case 0:
            break;
        case 30:
            startTime += 1;
            break;
    }

    let endTime = (endDate.getHours()-finalStartTime)*interval
    switch(endDate.getMinutes()) {
        case 0:
            break;
        case 30:
            endTime += 1;
            break;
    }

    for (let i = startTime; i <= endTime; i++)
    {
        timearray[i] += 1;
    }
    return timearray;
    }

    timetable.addEvent(course.name,course.days,course.dateStart,course.dateEnd);
}

// Add Class Button
const addClassButton = document.getElementById('addClass');

// Event for addClassbutton
addClassButton.addEventListener('click', () => {
    // Get Course from array of Courses in data.js
    let course1 = courseArray[counter];
    
    // Split course.days into single day and add them into table one-by-one
    let courseDays = course1.days.split(' ');
    courseDays.forEach(day => {
        course1.setDay(day);
        addClass(course1);
    });

    // rerender this table everytime we add a new course into the table
    renderer.draw('.timetable');

    // Increase counter to get new course
    counter++;
})

// Render table
let renderer = new Timetable.Renderer(timetable);
renderer.draw('.timetable');



