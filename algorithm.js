import Course from "./Course.js";
import courseArray from "./data.js";
import {newCourse} from './data.js'
import {instance} from './table.js'


// Setting for timetable
const finalStartTime = 6;
const finalEndTime = 21;
const interval = 12;

// Set up timetable
let timetable = new Timetable();
let renderer = new Timetable.Renderer(timetable);
timetable.setScope(finalStartTime, finalEndTime);
timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);

export class Node {
    constructor(name, crn, value, layer, children)
    {
        this.name = name;
        this.crn = crn;
        this.value = value;
        this.layer = layer;
        this.children = children;
    }

    traverse(node, result){
        if (node.children.length === 0) {
            result.push(node);
            return;
        }

        else {
            node.children.forEach(element => element.traverse(element, result));
        }

        return result;
        
    }

    insert(new_class_possibilities){
        //if ncp has no children
        if (this.children.length === 0)
        {
            //run through ncp array and add them to children array
            for (let i = 0; i < new_class_possibilities.length; i++)
            {
                //clone node in class list of times
                let temp = new Node(new_class_possibilities[i].name, new_class_possibilities[i].crn, new_class_possibilities[i].value, new_class_possibilities[i].layer, []);
                //console.log(temp);

                // Root is not combined with first layer
                if (this.value != 'Root')
                {
                    if (detectConflict(temp.value, this.value))
                    {
                        //console.log("there's a conflict");
                    }
                    else{
                        //console.log("there's no conflict");
                        temp.value = addArray(temp.value, this.value);
                        temp.crn = this.crn + " " + temp.crn;
                        this.children.push(temp);
                    }
                
                    //console.log(Math.max(... temp.value));
                    

                    //temp.value += this.value;
                }

                //uncomment to check addibng
                //console.log("add " + temp.value + "to " + this.value);
            }
        }   else {
            //traverse for all children until children array is empty
            this.children.forEach(element =>
                element.insert(new_class_possibilities));
        }
    }  
}
export default class Tree{ 
    constructor([...courses]){
        this.allCourses = [...courses];
    }

    generateTree([...courses]){
        let tree = new Node("Root", "", initializeTimeArray(), 0, []);
        let result = [];
        for(let course of [...courses]){
            tree.insert(course);
        }
        return tree;
    }

    deleteCourse(courseName){
        // console.log(this.allCourses.filter(course => course !== courseName));
        this.allCourses = this.allCourses.filter(course => course !== courseName);
        return this.generateTree(this.allCourses);
    }

    addCourse(newCourse){
        return this.generateTree([...this.allCourses, newCourse])
    }

    extractUsefulNodes(traverseResult, numOfClasses){
        return traverseResult.filter(result => result.crn.split(' ').length === (numOfClasses+1));
    }
    
    
}

// Find course based on crn
function findCourse(crn, allCourses){
    for (let course of allCourses){
      if (course.crn === crn){
        return course;
      }
    }
}
// Return time representation of the class in array.
function addEventToArray(startDate, endDate, days){
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
    let addInterval = findDayInterval(day);
    for (let i = startTime + addInterval; i < endTime + addInterval; i++)
    {
        timearray[i] += 1;
    }
    }
    return timearray;
}
// Initialize time array to 0s.
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
// Detect conflict by using max to array.
function detectConflict(class1, class2){
    let sum = addArray(class1, class2);
    //console.log(sum);
    return Math.max(...sum) === 2 ? true : false;
}
// Functions to add array.
function addArray(arr1, arr2) {
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
// Function to add class to timetable (must have timetable as global var)
function addClass(course){
    timetable.addEvent(course.name,course.days,course.dateStart,course.dateEnd);
}
function outputOneSchedule(usefulNode){
    timetable = new Timetable();
    renderer = new Timetable.Renderer(timetable);
    timetable.setScope(finalStartTime, finalEndTime)
    timetable.addLocations(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
    
    renderer.draw('.timetable');
    let y = usefulNode.crn.split(' ').filter(x => x !== "");
    for (let crnNum of y){    
        let course1 = findCourse(crnNum,courseArray)
        let courseClone = new Course(course1.crn, course1.name, course1.days, course1.dateStart, course1.dateEnd);
        let courseDays = courseClone.days.split(' ');
        for(let day of courseDays){
            courseClone.setDay(day);
            addClass(courseClone);
            renderer.draw('.timetable');
        }
    }
}
// Compare two arrays 
function compareArrays(arr1, arr2){
    if (arr1.length != arr2.length){
        return false;
    } else {
        for (let i=0; i < arr1.length; i++){
            if (arr1[i] != arr2[i]){
                return false;
            } else {
                return true;
            }
        }
    }
}


// result array for traversing.
let result = [];
let currentCourses = [];
// Get the generate button.
let generate = document.getElementById('generate');
// Counter to iterate through all possible schedules.
let counter = -1;
let useful;


generate.addEventListener('click', () => {
    // Find all selected classes
    let selectedClasses = $('#classes :selected');
    
    // Extract the stuff in checked rows.
    
    if(selectedClasses.length === 0){
        alert('No classes are selected');
        return;
    }

    // If current courses are equal to selected courses 
    // Then keep using the generated tree.
    // Else we need to generate the new tree.
    if (compareArrays(selectedClasses,currentCourses) === false){

        // Array to hold all sections of selectedClasses
        // layerNumber to each node.
        currentCourses = selectedClasses;
        counter = -1;
        let allSections = [];
        let layerNumber = 1;
        
        // Loop through and add courses to allSections
        for(let i = 0; i < selectedClasses.length; i++){
            let layer = [];
            let className = selectedClasses[i].innerText;
            for(let course of courseArray){
            if(course.name === className){
                let x = new Node(course.name, course.crn, addEventToArray(course.dateStart,course.dateEnd,course.days),layerNumber,[]);
                layer.push(x);
                }
            }
            allSections.push(layer);
            layerNumber++;
        }
        
        // Get checked course and add them in in another layer
        let checkedRows = instance.getCheckedRows();
        if (checkedRows.length !== 0){
            let checkedClassesLayer = [];
            for (let row of checkedRows) {
                let y = newCourse(row);
                let x = new Node(y.name, y.crn, addEventToArray(y.dateStart, y.dateEnd, y.days),layerNumber,[]);
                checkedClassesLayer.push(x);
            }
            selectedClasses.push(checkedClassesLayer);
            allSections.push(checkedClassesLayer);
            currentCourses = selectedClasses;

            // Error with the connection.
        }
        

        // Create new tree
        let tree = new Tree(allSections);
        let generatedTree = tree.generateTree(tree.allCourses);
        let traverseResult = generatedTree.traverse(generatedTree, result = []);
        useful = tree.extractUsefulNodes(traverseResult,selectedClasses.length);

        let node;
        if (counter < useful.length-1){
            counter++;
            node = useful[counter];
            outputOneSchedule(node);
        } else {
            alert("No More Possible Schedule 1")
            counter = -1;
            return;
        }
        
    } else {
        let node;
        if (counter < useful.length-1){
            counter++;
            node = useful[counter];
        } else {
            alert("No More Possible Schedule")
            counter = -1;
            return;
        }
        outputOneSchedule(node);
    }
})

let nextButton = document.getElementById('next');
nextButton.addEventListener('click', () => {
    if (currentCourses.length === 0){
        alert("No classes are selected!");
        return;
    }
    let node;

    if (counter < useful.length-1){
        counter++;
        node = useful[counter];
        outputOneSchedule(node);
    } else {
        alert("No More Possible Schedule")
        return;
    }
})

let prevButton = document.getElementById('previous');
prevButton.addEventListener('click', () => {
    if (currentCourses.length === 0){
        alert("No classes are selected!");
        return;
    }
    let node;
    // BUg here
    if (counter === 0){
        alert("cannot go back");
        return;
    }
    counter--;
    node = useful[counter];
    outputOneSchedule(node);
})

let getCRN = document.getElementById('getCRN');
// Copy CRN number to clipboard -> 
// IMPORTANT: Only work on Chrome
getCRN.addEventListener('click', () => {
    navigator.permissions.query({name: "clipboard-write"}).then(result => {
        if (result.state == "granted" || result.state == "prompt") {
            navigator.clipboard.writeText(useful[counter].crn).then(function() {
                alert("Successfully copied");
              }, function() {
                alert("Failed to copy to clipboard")
              });
        }
      });
})



