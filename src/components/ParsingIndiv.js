var jsonfile = require('jsonfile')
var projects = jsonfile.readFileSync('../../../../PythonParsing/parsed_json/parsed.json')

var namejson = './name_april_14_2017.json'
var projectsjson = './project_april_14_2017.json'
var inputdate = 'may_14_2017'
//process.argv[4]

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
var dateObj ={}
dateObj[inputdate]=nameprojectObj
dateObj["may_5_2017"]=nameprojectObj

var currentnameproject = jsonfile.readFileSync('./nameproject.json')
console.log(currentnameproject)
