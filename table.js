import Course from './Course.js';
import {newCourse} from './data.js'
import {data} from './class_info.js'


// Render table
let timetable = new Timetable();

// Set the time from 6AM to 9PM
const finalStartTime = 6;
const finalEndTime = 21;
const interval = 12; //  1 hour / 5 minutes = 12 x 5mins interval each hour

timetable.setScope(finalStartTime, finalEndTime)

//  Set the rows headers
timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);



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

Grid.applyTheme('striped'); // Call API of static method

function addClass(course){
    timetable.addEvent(course.name,course.days,course.dateStart,course.dateEnd);
}

