function nextNode(key, MST){
  var next_vertex = Infinity;
  var mini;
  for(var x = 0; x< MST.length; x++){
    if(MST[x] == false && key[x] < next_vertex){
      next_vertex = key[x];
      mini = x; 
    }
  }
  return mini;
  
}

function printMST(parents, Node_list){
  for (let v = 1; v < Node_list.length; v++){
    console.log(parents[v], "-", Node_list[v].node_label);
    Node_list[parents[v]].updateColor(Node_list[v]);
    Node_list[v].updateColor(Node_list[parents[v]]); 
  }
  
}

function Prims(Node_list){
  console.log(Node_list[0].color);
  var MST = new Array(Node_list.length);
  var key = new Array(Node_list.length);
  var parents = new Array(Node_list.length);
  for (var i= 0; i<Node_list.length; i++) {
    key[i] = Infinity;
    MST[i] = 0;
  }
  key[0] = 0;
  parents[0] = -1;
  
  
  for(i=0; i<Node_list.length; i++){
    var minnext = nextNode(key, MST);
    MST[minnext] = 1;
    Node_list[minnext].color = "#F96618";
    var end_nod;
    var start_nod;
    
    //check edges
    for (var e = 0; e< Node_list[minnext].edges.length; e++){
      if(MST[Node_list[minnext].edges[e].end.node_label] == false && 
         Node_list[minnext].edges[e].weight < key[Node_list[minnext].edges[e].end.node_label]){
        
        start_nod = minnext;
        end_nod = Node_list[minnext].edges[e].end.node_label;
        console.log(start_nod, end_nod);
        parents[end_nod] = minnext;
        key[end_nod] =  Node_list[minnext].edges[e].weight;
      }
      
    }
    
    //Node_list[start_nod].updateColor(Node_list[end_nod]);
    //Node_list[end_nod].updateColor(Node_list[start_nod]); 
    
  }
  return parents;
  
}
let Node_list = [
    { node_label: 0, edges: [{ end: { node_label: 1 }, weight: 4 }, { end: { node_label: 2 }, weight: 7 }] },
    { node_label: 1, edges: [{ end: { node_label: 0 }, weight: 4 }, { end: { node_label: 2 }, weight: 8 }, { end: { node_label: 3 }, weight: 11 }] },
    { node_label: 2, edges: [{ end: { node_label: 0 }, weight: 7 }, { end: { node_label: 1 }, weight: 8 }, { end: { node_label: 3 }, weight: 2 }, { end: { node_label: 4 }, weight: 5 }] },
    { node_label: 3, edges: [{ end: { node_label: 1 }, weight: 11 }, { end: { node_label: 2 }, weight: 2 }, { end: { node_label: 4 }, weight: 9 }, { end: { node_label: 5 }, weight: 14 }] },
    { node_label: 4, edges: [{ end: { node_label: 2 }, weight: 5 }, { end: { node_label: 3 }, weight: 9 }, { end: { node_label: 5 }, weight: 10 }] },
    { node_label: 5, edges: [{ end: { node_label: 3 }, weight: 14 }, { end: { node_label: 4 }, weight: 10 }] }
  ];
Prims(Node_list);

// function findCheapestEdge(Node_list, components) {
//   let cheapestEdges = new Array(Node_list.length);

//   for (let i = 0; i < Node_list.length; i++) {
//       cheapestEdges[i] = { weight: Infinity, start: null, end: null };
//   }

//   for (let node of Node_list) {
//       for (let edge of node.edges) {
//           let startComponent = components[edge.start.node_label];
//           let endComponent = components[edge.end.node_label];
//           if (startComponent !== endComponent && edge.weight < cheapestEdges[startComponent].weight) {
//               cheapestEdges[startComponent] = {
//                   weight: edge.weight,
//                   start: edge.start.node_label,
//                   end: edge.end.node_label
//               };
//           }
//       }
//   }

//   return cheapestEdges;
// }

// function Boruvka(Node_list) {
//   let MST = [];
//   let components = new Array(Node_list.length);

//   for (let i = 0; i < Node_list.length; i++) {
//       components[i] = i;
//   }

//   while (MST.length < Node_list.length - 1) {
//       let cheapestEdges = findCheapestEdge(Node_list, components);
//       for (let edge of cheapestEdges) {
//           if (edge.start !== null && edge.end !== null) {
//               let startComponent = components[edge.start];
//               let endComponent = components[edge.end];
//               if (startComponent !== endComponent) {
//                   MST.push(edge);
//                   for (let i = 0; i < components.length; i++) {
//                       if (components[i] === endComponent) {
//                           components[i] = startComponent;
//                       }
//                   }
//               }
//           }
//       }
//   }

//   return MST;
// }
