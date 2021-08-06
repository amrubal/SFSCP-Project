import courseArray from './data.js';
import Tree from './algorithm.js'
import Node from './algorithm.js'
$(document).ready(function(){
    $(".dropdown-toggle").dropdown();
  });

function findCourse(crn, allCourses){
  for (let course of allCourses){
    if (course.crn === crn){
      return course;
    }
  }
}






// We have an array = [ [class1], [class2], [class3],[class4]]