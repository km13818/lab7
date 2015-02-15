var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;
  console.log("projectID: " + projectID);
  // query for the specific project and
  models.Project
    .find({"_id" : projectID })
    .exec(afterQuery);
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var newProject = new models.Project({ 'project_title' : form_data['project_title'],
  'image_url' : form_data['image_url'],
  'date' : form_data['date'],
  'summary' : form_data['summary']});

  newProject.save(afterSaving);
  function afterSaving(err) { // this is a callback
    if(err) {
      console.log(err); 
      res.send(500); 
    }
    res.redirect('/');
  }
  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;
  models.Project
    .find({"_id" : projectID })
    .remove()
    .exec(afterDelete);
  function afterDelete(err, projects) {
    if(err) console.log(err);
    res.send();
  }

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();
}