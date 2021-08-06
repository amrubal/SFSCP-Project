import Course from './Course.js';
import {newCourse} from './data.js'
import {data} from './class_info.js'
import courseArray from './data.js'


// Render table
let timetable = new Timetable();

// Set the time from 6AM to 9PM
const finalStartTime = 6;
const finalEndTime = 21;
const interval = 12; //  1 hour / 5 minutes = 12 x 5mins interval each hour

timetable.setScope(finalStartTime, finalEndTime)

//  Set the rows headers
timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);


//To test adding multiple days to addEventToArray
//let y = new Course("134", "name", 'Monday Wednesday Friday', new Date(2015,7,17,6,0), new Date(2015,7,17,7,0));
//console.log(addEventToArray(y.dateStart, y.dateEnd, y.days));


let renderer = new Timetable.Renderer(timetable);
renderer.draw('.timetable');

// Declare placeholder for current courses
let currentCourses = [];
const Grid = tui.Grid;

const instance = new Grid({
    el: document.getElementById('grid'),
     // Container element
    data: data,
    rowHeaders: ['checkbox'],
    bodyHeight: 200,
    columns: [
        {
            header: 'CRN',
            name: 'crn',
            sortable: true,
          },
          {
            header: 'Subject',
            name: 'subj'
          },
          {
            header: 'Title',
            name: 'title'
          },
          {
            header: 'Time',
            name: 'time',
            className: 'hello'
          },
          {
            header: 'Instructor',
            name: 'instructor'
          },
          {
            header: 'Attribute',
            name: 'attribute'
          },
          {
            header: 'Days',
            name: 'days'
          },
    ],
   
});

// Add class to timetable when checking
instance.on('check', (e) => {
    let course1 = newCourse(instance.getRow(e.rowKey));
    currentCourses.push(course1);
    
    // Copy current courses to temp
    // because we are going to change it when adding to schedule
    let temp = [];
    for (let course of currentCourses){
        temp.push(new Course(course.crn, course.name,course.days, course.dateStart, course.dateEnd));
    }

    for(let course of currentCourses){
        let courseDays = course.days.split(' ');
        for(let day of courseDays){
            course.setDay(day);
            addClass(course);
            renderer.draw('.timetable');
        }
    }
    console.log(temp);
    currentCourses = temp;
})

instance.on('uncheck', (e) => {
    let courseRemove = newCourse(instance.getRow(e.rowKey));
    // Should filter based on CRN because those are unique
    currentCourses = currentCourses.filter(course => course.crn != courseRemove.crn);
    
    // If currentCourses empty print empty schedule 
    // If currentCourses not empty re-print schedule without removed class.
    if (currentCourses.length === 0) {
        // Essentially erase the table and render it again.
        timetable = new Timetable();
        renderer = new Timetable.Renderer(timetable);
        timetable.setScope(finalStartTime, finalEndTime)
        timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
        renderer.draw('.timetable');
    } else {
        // Erase the table and add the class again (with the unchecked class removed)
        timetable = new Timetable();
        renderer = new Timetable.Renderer(timetable);
        timetable.setScope(finalStartTime, finalEndTime)
        timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
        
        // Copy current courses to temp
        // because we are going to change it when adding to schedule
        let temp = [];
        for (let course of currentCourses){
            temp.push(new Course(course.crn, course.name,course.days, course.dateStart, course.dateEnd));
        }

        for(let course of currentCourses){
            let courseDays = course.days.split(' ');
            for(let day of courseDays){
                course.setDay(day);
                addClass(course);
                renderer.draw('.timetable');
            }
        }

        currentCourses = temp;
    }
})

Grid.applyTheme('striped', { // Call API of static method
  cell: {
    header: {
      background: '#FFE09C'
    },
    evenRow: {
      background: '#9CBBFF'
    }
  }
}); 

function addClass(course){
    timetable.addEvent(course.name,course.days,course.dateStart,course.dateEnd);
}

// Intialize time array with 0s.
function initializeTimeArray(){
    // Initialize timearray to empty array
    let timearray = [];

    // Loop and add zero into each interval
    for (let i = 0; i < (finalEndTime-finalStartTime)*interval*5; i++)
    {
        timearray.push(0);
    }
    return timearray;
}

function addEventToArray(startDate, endDate, days){
    let timearray = initializeTimeArray();
    //hours of event time substracted by start time multiplied by intervals between every hour
    let startTime = (startDate.getHours()-finalStartTime)*interval
    switch(startDate.getMinutes()) {
      case 0:
        break;
      case 5:
        startTime += 1;
        break;
      case 10:
        startTime += 2;
        break;
      case 15:
        startTime += 3;
        break;
      case 20:
        startTime += 4;
        break;
      case 25:
        startTime += 5;
        break;
      case 30:
        startTime += 6;
        break;
      case 35:
        startTime += 7;
        break;
      case 40:
        startTime += 8;
        break;
      case 45:
        startTime += 9;
        break;
      case 50:
        startTime += 10;
        break;
      case 55:
        startTime += 11;
        break;
    }

    let endTime = (endDate.getHours()-finalStartTime)*interval
    switch(endDate.getMinutes()) {
    case 0:
      break;
    case 5:
      endTime += 1;
      break;
    case 10:
      endTime += 2;
      break;
    case 15:
      endTime += 3;
      break;
    case 20:
      endTime += 4;
      break;
    case 25:
      endTime += 5;
      break;
    case 30:
      endTime += 6;
      break;
    case 35:
      endTime += 7;
      break;
    case 40:
      endTime += 8;
      break;
    case 45:
      endTime += 9;
      break;
    case 50:
      endTime += 10;
      break;
    case 55:
      endTime += 11;
      break;
    }

    let courseDays = days.split(' ');
    
    for(let day of courseDays)
    {
      console.log(day);
      let addInterval = findDayInterval(day);
      for (let i = startTime + addInterval; i < endTime + addInterval; i++)
      {
        timearray[i] += 1;
      }
    }
    return timearray;
}

function findDayInterval(day)
{
  //determine where all the days are at in the event array
  let x = 0;
  switch(day) {
      case 'Monday':
          break;
      case 'Tuesday':
          x += 15 * interval;
          break;
      case 'Wednesday':
          x += 15 * (interval * 2);
          break;
      case 'Thursday':
          x += 15 * (interval * 3);
          break;
      case 'Friday':
          x+= 15 * (interval * 4);
          break;
  }
  return x;
}



