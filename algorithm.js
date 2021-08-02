class Node {
    constructor(value, layer, children)
    {
        this.value = value;
        this.layer = layer;
        this.children = children;
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
                    temp.value += this.value;
                }

                //add children
                console.log("add " + temp.value + "to " + this.value);
                console.log("ncp: " + temp.value);
                this.children.push(temp);
            }
        }

        else {
            //traverse for all children until children array is empty
            this.children.forEach(element =>
                element.insert(new_class_possibilities));
        }
    }
}

let node1 = new Node('first', 1, []);
let node2 = new Node('second', 1, []);
let node6 = new Node('sixth', 1, []);
let layer1 = [];
layer1.push(node1);
layer1.push(node2);
layer1.push(node6);


let node3 = new Node('third', 2, []);
let node5 = new Node('fifth', 2, []);
let layer2 = [];
layer2.push(node3);
layer2.push(node5);


let node4 = new Node('fourth', 3, []);
let node7 = new Node('seventh', 3, []);
let layer3 = [];
layer3.push(node4);
layer3.push(node7);

let tree = new Node('Root', 0, []);

//insert a list of times for one class
tree.insert(layer1);
tree.insert(layer2);
tree.insert(layer3);

console.log(tree.children[0].children[0].children[0]);

