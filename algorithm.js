

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

    insert(new_class_possibilities)
    {
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
        }

        else {
            //traverse for all children until children array is empty
            this.children.forEach(element =>
                element.insert(new_class_possibilities));
        }
    }

    delete(node){
        console.log("Deleting in progress!");
    }
}





function detectConflict(class1, class2){
    let sum = addArray(class1, class2);
    //console.log(sum);
    return Math.max(...sum) === 2 ? true : false;
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

let node1 = new Node([0,0,1,1,0,0,0,0], 1, []);
let node2 = new Node([1,1,0,0,0,0,0,0], 1, []);
let layer1 = [];
layer1.push(node1);
layer1.push(node2);


let node3 = new Node([0,0,0,0,1,1,0,0], 2, []);
let layer2 = [];
layer2.push(node3);


let node4 = new Node([0,0,1,1,0,0,0,0], 3, []);
let node5 = new Node([0,1,1,0,0,0,0,0], 3, []);
let layer3 = [];
layer3.push(node4, node5);

let tree = new Node([0,0,0,0,0,0,0,0], 0, []);

//insert a list of times for one class
tree.insert(layer1);
tree.insert(layer2);
tree.insert(layer3);
tree.delete(node5);


// Generate tree function
class Tree{
    
    constructor([...courses]){
        this.allCourses = [...courses];
    }

   

    generateTree([...courses]){
        for(let course of [...courses]){
            console.log(course);
        }
    }

    deleteCourse(courseName){
        return this.generateTree(this.allCourses.filter(course => course !== courseName));
    }

    add(newCourse){
        return this.generateTree([...this.allCourses, newCourse])
    }
    
    
}




let x = new Tree(['class1', 'class2','class3','class4']);
x.generateTree(x.allCourses);
console.log("---------");
x.add('class6');
