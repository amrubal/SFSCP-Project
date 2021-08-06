import courseArray from "./data.js";
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
        console.log(traverseResult[135].crn.split(' ').length);
        return traverseResult.filter(result => result.crn.split(' ').length === (numOfClasses+1));
    }
    
    
}



/* ------------------------------ Functions for Node ------------------------------ */
function detectConflict(class1, class2){
    let sum = addArray(class1, class2);
    //console.log(sum);
    return Math.max(...sum) === 2 ? true : false;
}
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
const finalStartTime = 6;
const finalEndTime = 21;
const interval = 12; //  1 hour / 5 minutes = 12 x 5mins interval each hour
/* ------------------------------ Functions for Node ------------------------------ */


// Current flow of the program
// 1: Create all nodes, which represent different sections for a single class.
// 2: Put those nodes into class accordingly. (class1, class2, ... )
// 3: Create a new Tree
// 4. Generate tree using all the classes in an array (Tree([class1, class2, ...]))
// 5. Delete / Add more classes based on the tree object. 

// Create all the nodes
let node1 = new Node("a", "100", [0,0,1,1,0,0,0,0], 1, []);
let node2 = new Node("b", "101", [1,1,0,0,0,0,0,0], 1, []);
let node3 = new Node("c", "102", [0,0,0,0,1,1,0,0], 2, []);
let node4 = new Node("d", "103", [0,0,1,1,0,0,0,0], 3, []);
let node5 = new Node("e", "104", [0,1,1,0,0,0,0,0], 3, []);

// Assign nodes into classes
let class1 = [node1, node2];
let class2 = [node3];
let class3 = [node4, node5];
let sample = [];
sample.push(class1, class2, class3);

// Create new tree and perform add/deletion on them.
let tree = new Tree(sample);
console.log(tree.allCourses[0]);
let before = tree.generateTree(tree.allCourses);
let result = [];
let x = before.traverse(before, result);
console.log(x);


let generate = document.getElementById('generate');

generate.addEventListener('click', () => {
  var selectedClasses = $('#classes :selected');
  let arr = [];
  let layerNumber = 1;
  for(let i = 0; i < selectedClasses.length; i++){
    let layer = [];
    let className = selectedClasses[i].innerText;
    for(let course of courseArray){
      if(course.name === className){
        let x = new Node(course.name, course.crn, addEventToArray(course.dateStart,course.dateEnd,course.days),layerNumber,[]);
        layer.push(x);
      }
    }
    arr.push(layer);
    layerNumber++;
  }
  // Arr is an array of all courses that match 
  // now we need to transform a from course to node.

  let tree = new Tree(arr);
  console.log("This tree");
  console.log(tree.allCourses);
  let before = tree.generateTree(tree.allCourses);
  let traverseResult = before.traverse(before, result = []);
  let useful = tree.extractUsefulNodes(traverseResult,4);
  console.log(useful);
    for(let i = 0; i < useful.length; i++){
        console.log(`${i}` + useful[i].crn);
    }
})

// Each class will be an array of different nodes
// each node represent a different section.
//TODO: Find classes that have the same 
function findCourse(crn, allCourses){
    for (let course of allCourses){
      if (course.crn === crn){
        return course;
      }
    }
    }

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
