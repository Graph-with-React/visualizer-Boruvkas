let m_component = {};
function find_component(u) {
  if (m_component[u] == u) {
    return u;
  }
 // console.log("find_component");
  return find_component(m_component[u]);
}

function set_component(u) {
  if (m_component[u] == u) {
    return;
  } else {
    for (let k in m_component) {
      m_component[k] = find_component(k);
    }
  }
 // console.log(" set_component");

}

function union(vertex_size, u, v) {
  if (vertex_size[u] <= vertex_size[v]) {
    m_component[u] = v;
    vertex_size[v] += vertex_size[u];
    set_component(u);
  } else if (vertex_size[u] >= vertex_size[v]) {
    m_component[v] = find_component(u);
    vertex_size[u] += vertex_size[v];
    set_component(v);
  }
  //console.log("union");
}

function boruvka(Node_list) {
  let vertex_size = [];
  let mst_weight = 0;
  //let minimum_weight_edge = [];
  let minimum_weight_edge = Array(Node_list.length).fill([-1, -1, -1]);

  for (let node = 0; node < Node_list.length; node++) {
    m_component[node] = node;
    vertex_size.push(1);
  }

  let num_of_components = Node_list.length;
  //console.log("---------Forming MST------------");

  while (num_of_components > 1) {
    for (let i = 0; i < Node_list.length; i++) {
      const edges = Node_list[i].edges;

      for (let e = 0; e < edges.length; e++) {
        const { end, weight } = edges[e];
        const u = i;
        const v = end.node_label;

        const u_component = find_component(u);
        const v_component = find_component(v);
       // Node_list[u].color = "#F96618";
        if (u_component !== v_component) {
          if (
            minimum_weight_edge[u_component] == -1 || minimum_weight_edge[u_component][2] > weight
          ) {
            minimum_weight_edge[u_component] = [u, v, weight];
          }
          if (
            minimum_weight_edge[v_component] == -1 ||
            minimum_weight_edge[v_component][2] > weight
          ) {
            minimum_weight_edge[v_component] = [u, v, weight];
          }
        }
      }
    }

    for (let node = 0; node < Node_list.length; node++) {
      const [u, v, w] = minimum_weight_edge[node];
      const u_component = find_component(u);
      const v_component = find_component(v);

      if (u_component !== v_component) {
        mst_weight += w;
        union(vertex_size, u_component, v_component);
        console.log(`Added edge [${u} - ${v}]\nAdded weight: ${w}\n`);
         Node_list[u].color = "#F96618";
        // Node_list[v].color = "#F96618";
        num_of_components--;
      }
    }
    // Node_list[u].color = "#F96618";
    minimum_weight_edge = Array(Node_list.length).fill([-1]);
  }

  console.log("----------------------------------");
  console.log(
    `The total weight of the minimal spanning tree is: ${mst_weight}`
  );
  return m_component;
}
let Node_list = [
    { node_label: 0, edges: [{ end: { node_label: 1 }, weight: 4 }, { end: { node_label: 2 }, weight: 7 }] },
    { node_label: 1, edges: [{ end: { node_label: 0 }, weight: 4 }, { end: { node_label: 2 }, weight: 8 }, { end: { node_label: 3 }, weight: 11 }] },
    { node_label: 2, edges: [{ end: { node_label: 0 }, weight: 7 }, { end: { node_label: 1 }, weight: 8 }, { end: { node_label: 3 }, weight: 2 }, { end: { node_label: 4 }, weight: 5 }] },
    { node_label: 3, edges: [{ end: { node_label: 1 }, weight: 11 }, { end: { node_label: 2 }, weight: 2 }, { end: { node_label: 4 }, weight: 9 }, { end: { node_label: 5 }, weight: 14 }] },
    { node_label: 4, edges: [{ end: { node_label: 2 }, weight: 5 }, { end: { node_label: 3 }, weight: 9 }, { end: { node_label: 5 }, weight: 10 }] },
    { node_label: 5, edges: [{ end: { node_label: 3 }, weight: 14 }, { end: { node_label: 4 }, weight: 10 }] }
  ];
  boruvka(Node_list);