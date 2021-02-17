This is the Pathfinding Visualizer web application! I built this application because I was fascinated by pathfinding algorithms, and I wanted to visualize them in action. I hope that you enjoy playing around with this visualization tool just as much as I enjoyed building it.

Supported Algorithm:
Dijkstra's Algorithm (weighted): the father of pathfinding algorithms; guarantees the shortest path

This project was about creating a new perspective on looking at how algorithms operate. Pathfinding algorithms are algorithms that find the shortest path between 2 points. I have used react as a framework to implement a small scale grid where the user can mark a start point and an endpoint. When the user presses the Visualise button it will then shows visually how the computation looks at each cell of the grid by colour coding the ones which have been visited by the algorithm. The nodes in each frame will carry out the constant calculation of the distance between the nodes and depending on the algorithm the method carried out is different from each one. So far I have only implemented the dijkstra algorithm.


How does Dijkstra's Algorithm work?
The Dijkstra’s algorithm finds the shortest path between two points by picking the unvisited vertex with the lowest distance, calculates the distance through it to each unvisited neighbour and updates the neighbour’s distance if smaller. Mark visited when done with neighbours.

The disadvantage of Dijkstra: because Dijkstra doesn’t build any idea of the direction you are travelling, any kind of heuristic about what you are doing in a smarter way, a traffic jam can affect the speed of the algorithm.

→ only follow the path that is currently shortest, and don't pay any attention to what direction it is going.
→If you have another graph structure of quite a dense network of nodes such as looking through a uniform weighted grid, the algorithm will just flood fill through it and this is not very optimal.

How does the A* algorithm work?
A* is basically a small extension to Dijkstra that builds in a heuristic that says we are getting a little bit closer. 

A* is a path-finding algorithm is an extension on Dijkstra’s that works on weighted graphs with a heuristic function that estimates the cost of travelling from node n to the goal node (The heuristics function is problem-specific).

The nodes to be considered at each step is stored in a collection - usually a priority queue. It starts by adding every node that is adjacent to the start node into the queue with their estimated total cost, based on the formula = f(n) = g(n) + h(n), where g(n) is the actual cost from the start node to node n, while h(n) is the heuristic function.

What this does is that it prioritizes nodes that are going roughly in the right direction.

At each iteration, the node with the smallest estimated cost f(n) is expanded. A path is found when the goal node is the one chosen for expansion. Alternatively, no path is found if the queue becomes empty.

