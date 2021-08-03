class Node {
    constructor(value, layer, children)
    {
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
                let temp = new Node(new_class_possibilities[i].value, new_class_possibilities[i].layer, []);
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

class Tree{
    
    constructor([...courses]){
        this.allCourses = [...courses];
    }

    generateTree([...courses]){
        let tree = new Node([0,0,0,0,0,0,0,0], 0, []);
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
/* ------------------------------ Functions for Node ------------------------------ */


// Current flow of the program
// 1: Create all nodes, which represent different sections for a single class.
// 2: Put those nodes into class accordingly. (class1, class2, ... )
// 3: Create a new Tree
// 4. Generate tree using all the classes in an array (Tree([class1, class2, ...]))
// 5. Delete / Add more classes based on the tree object. 

// Create all the nodes
let node1 = new Node([0,0,1,1,0,0,0,0], 1, []);
let node2 = new Node([1,1,0,0,0,0,0,0], 1, []);
let node3 = new Node([0,0,0,0,1,1,0,0], 2, []);
let node4 = new Node([0,0,1,1,0,0,0,0], 3, []);
let node5 = new Node([0,1,1,0,0,0,0,0], 3, []);
let node6 = new Node([0,0,0,0,0,0,0,0], 4, []);

// Assign nodes into classes
let class1 = [node1, node2];
let class2 = [node3];
let class3 = [node4, node5];
let class4 = [node6];

// Create new tree and perform add/deletion on them.
let tree = new Tree([class1, class2, class3]);
let before = tree.generateTree(tree.allCourses);
console.log(before.traverse(before, result=[]));
console.log("---------");
let after = tree.addCourse(class4);
console.log(after.traverse(after, result=[]));

// Each class will be an array of different nodes
// each node represent a different section.
//TODO: Find classes that have the same 
