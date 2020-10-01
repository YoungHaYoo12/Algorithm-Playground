# Algorithm Playground
Algorithm Playground is a web application that provides users with a tool to visualize and interact with key algorithms and data structures, such as Binary Search Trees, various sorting algorithms, various pathfinding algorithms, and more. 

## Motivation
Algorithm Playground was created as a way to teach others about key algorithms and data structures that are essential building blocks for a solid computer science background. While serving in the military, I had the opportunity to teach fellow soldiers about topics that I had learned during my COS 226 algorithms class at Princeton University. While teaching them, I found that they had lots of questions about what happens if this is the input and what happens if that is the input. For example, one person asked me what would be the ideal d value to use for a D-ary heap in heap sort. I realized that a platform to enable users to explore their specific curiosities about algorithms and data structures would be a productive educational tool.  

## Screenshots
Include logo/demo screenshot etc.

## Tech/framework used
<b>Built with</b>
<ul>
  <li>Basic HTML, CSS, Javascript</li>
  <li>React</li>
  <li>
    Third Party Libraries
    <ul>
      <li>bootstrap</li>
      <li>immutability-helper</li>
      <li>jquery</li>
      <li>jquery-connections</li>
      <li>lodash</li>
      <li>react</li>
      <li>react-bootstrap</li>
      <li>react-dnd</li>
      <li>react-dnd-html5-backend</li>
      <li>react-dom</li>
      <li>react-lineto</li>
      <li>react-load-script</li>
      <li>react-router-dom</li>
    </ul>
  </li>
</ul>

## Features
One essential feature that distinguishes Algorithm Playground is the sheer level of choices that it gives users while they explore and interact with algorithms and data structures. The following examples illustrate my point:
1. The sorting visualizer, like many other visualizers on the web, enables users to visualize key sorting algorithms, such as selection sort, insertion sort, merge sort, quick sort, bubble sort, and heap sort. However, it gives users a wider arrange of choices. Firstly, it offers visualization of less common algorithms, such as binary insertion sort, bottom up merge sort, 3-way quick sort, and shell sort. Secondly, it offers users the choice to add optimizations to the sorting algorithms. For example, users have the choice of adding the half-exchange optimization to insertion sort and the cut-off to insertion sort optimization for merge sort and quick sort. Thirdly, it enables users to click on a specific element and track the location of this element throughout the sorting algorithm. 

2. The binary search visualizer offers the standard visualization of the binary search algorithm. However, in addition to that, it offers a wide array of variations of binary search. Namely, it enables users to visualize how binary search can be used to find the floor, ceiling, the first occurring index of an element, and the last occurring index of an element. 

3. The binary search tree (BST) visualizer offers visualizations for standard BST operations, such as put, contains, get, and delete. In addition to that, however, the BST offers users the choice to visualize ordered operations, such as floor, ceiling, select, and rank, as well as operations to check whether the BST is a full, complete, or perfect BST. Not only that, but the BST visualizer also gives users the option to visualize the process by which a BST is balanced. 

The detailed tutorials before every algorithm visualizer are also essential features of Algorithm Playground. The tutorials contain a detailed overview about the functioning, implementations, and time/space complexities of their respective algorithms and data structures. The tutorials enable users to learn accurate information while interacting with the visualizers.

## How to use?
Visit the following link to visit the web page for Algorithm Playground.

## Contribute
Contributions of visualizers for other algorithms that have not yet been included are welcome.

## Credits
First, I would like to give credit to the material provided by the Princeton University <a href="https://www.cs.princeton.edu/courses/archive/fall20/cos226/">COS 226 course</a> designed by <a href="https://www.cs.princeton.edu/~rs/">Robert Sedgewick</a> and <a href="https://www.cs.princeton.edu/~wayne/contact/">Kevin Wayne</a>. A significant portion of the algorithm concepts were learned when I took this course as a first-year undergraduate student at Princeton, and much of the algorithm visualizer code in this project was adapted from the code provided by COS 226 course material. 

Second, I would like to give credit to Youtuber Clement Mihailescu's video on <a href="https://www.youtube.com/watch?v=msttfIHHkak&t=2334s">Pathfinding Visualizers</a>. Studying Clement's video inspired me in coming up with my own method to animate the algorithms in my own visualizers. 

#### Other Useful Information
The following web application was created on Code Sandbox. I wrote the code for this application, while serving in the military, and, as a result, did not have access to a personal computer. Due to the fact that I had to use a public computer, I decided to use an online code environment. 

© [Young Ha Yoo]()
