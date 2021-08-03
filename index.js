import Course from './Course.js';
import courseArray from './data.js'

// Counter to get course from arr
let list = generateList();
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

// Generate random numbers in a list
function generateList(){
    let list = [];
    for(let i = 0; i < courseArray.length;i++){
        list.push(i);
    }
    let i = list.length-1;
    while (i >= 0){
        let j = Math.floor(Math.random() * (i+1));
        
        let temp = list[i];
        list[i] = list[j];
        list[j] = temp;
        i--;
    }
    return list;
}

// Intialize time array with 0s.
function initializeTimeArray(arr){
    // Initialize timearray to empty array
    let timearray = [];

    // Loop and add zero into each interval
    for (let i = 0; i < (finalEndTime-finalStartTime)*interval*5; i++)
    {
        timearray.push(0);
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
    timetable.addEvent(course.name,course.days,course.dateStart,course.dateEnd);
}

function addEventToArray(startDate, endDate, day){
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

// Add Class Button
const addClassButton = document.getElementById('addClass');

// Event for addClassbutton

let arr = initializeTimeArray();

addClassButton.addEventListener('click', () => {
    // Get Course from array of Courses in data.js
    let course1 = courseArray[list[counter]];
    
    // Split course.days into single day and add them into table one-by-one
    let courseDays = course1.days.split(' ');
    for(let day of courseDays){
        course1.setDay(day);
        arr = addArray(arr,  addEventToArray(course1.dateStart, course1.dateEnd, day));
        if (Math.max(...arr) === 2){
            alert("Cannot add");
            break;
        } else {
            console.log("adding array");
            addClass(course1);
        }
        console.log(Math.max(...arr));
        console.log(detectConflict(arr, course1));

    };

    //add drop down menu based off core and then display chose core in table
    $(document).ready(function(){
        $('.dropdown-toggle').dropdown();
    });


    // rerender this table everytime we add a new course into the table
    renderer.draw('.timetable');

    // Increase counter to get new course
    counter++;
})

// Render table
let renderer = new Timetable.Renderer(timetable);
renderer.draw('.timetable');



