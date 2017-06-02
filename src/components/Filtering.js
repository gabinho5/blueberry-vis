var jsonfile = require('jsonfile')
var projects = jsonfile.readFileSync('./global.json')

var projectObj = {};
var nameObj = {};

var filters = {}

filters.sectors = [] //this comes from state of ChartsContainer
filters.ptype = ['pipeline', 'internal', 'other', 'business development']


// const Filtering = ({Date},{filter})
//projects[HERE IS WHERE WE PUT THE DATE VARIABLE]
for (var i = 0; i < projects['Apr-14-2017'].length; i++) { //1 variable
  var currentProject = projects['Apr-14-2017'][i]
  var currentName = projects['Apr-14-2017'][i]
  if (!(filters.sectors.includes(currentProject.sector) || filters.ptype.includes(currentProject.ptype))) { //2 vars
    if (Object.keys(projectObj).includes(currentProject.project)) {
      projectObj[currentProject.project][currentProject.first_name] = currentProject.hours
    } else {
      projectObj[currentProject.project] = {}
      projectObj[currentProject.project][currentProject.first_name] = currentProject.hours
    }
    if (Object.keys(nameObj).includes(currentName.first_name)) {
      nameObj[currentName.first_name][currentName.project] = currentName.hours
    } else {
      nameObj[currentName.first_name] = {}
      nameObj[currentName.first_name][currentName.project] = currentName.hours
    }
  }
}

var projectArray = [];
var nameArray = [];

Object.keys(projectObj).map( key => {
  projectObj[key].project = key
  projectArray.push(projectObj[key])
})
Object.keys(nameObj).map( key => {
  nameObj[key].name = key
  nameArray.push(nameObj[key])
})
projectArray.sort(( a, b ) => {
  a = a.project.toLowerCase();
  b = b.project.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
});

nameArray.sort(( a, b ) => {
  a = a.name.toLowerCase();
  b = b.name.toLowerCase();

  return a < b ? -1 : a > b ? 1 : 0;
});
var nameprojectObj = {
  name : nameArray,
  project : projectArray
}
