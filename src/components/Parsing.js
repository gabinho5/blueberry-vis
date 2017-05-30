var jsonfile = require('jsonfile')
var projects = jsonfile.readFileSync('../../../../PythonParsing/parsed_json/parsed.json')

var inputdate = process.argv[2]

var projectObj = {};
var nameObj = {};

for (var i = 0; i < projects.length; i++) {
  var currentProject = projects[i]
  if (Object.keys(projectObj).includes(currentProject.project)) {
    projectObj[currentProject.project][currentProject.first_name] = currentProject.hours
  } else {
    projectObj[currentProject.project] = {}
    projectObj[currentProject.project][currentProject.first_name] = currentProject.hours
  }
}

for (var i = 0; i < projects.length; i++) {
  var currentName = projects[i]
  if (Object.keys(nameObj).includes(currentName.first_name)) {
    nameObj[currentName.first_name][currentName.project] = currentName.hours
  } else {
    nameObj[currentName.first_name] = {}
    nameObj[currentName.first_name][currentName.project] = currentName.hours
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

var currentnameproject = jsonfile.readFileSync('./nameproject.json')
currentnameproject[inputdate]=nameprojectObj
jsonfile.writeFileSync('./nameproject.json', currentnameproject, {spaces:1})
