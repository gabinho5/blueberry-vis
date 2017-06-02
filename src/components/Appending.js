var jsonfile = require('jsonfile')

var newdate = jsonfile.readFileSync('../../../PythonParsing/parsed_json/May-19-2017.json')

var currentnameproject = jsonfile.readFileSync('./global.json')
currentnameproject['May-19-2017'] = newdate['May-19-2017']
jsonfile.writeFileSync('./global.json', currentnameproject, {spaces:1})
