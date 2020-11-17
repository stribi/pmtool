package hr.from.goranpopovic.pmtoolserver.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.from.goranpopovic.pmtoolserver.domain.Project;
import hr.from.goranpopovic.pmtoolserver.services.ProjectService;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@PostMapping("")
	public ResponseEntity<Project> createNewProject(@RequestBody Project project){
		Project projectToSave = projectService.saveOrUpdateProject(project);
		return new ResponseEntity<Project>(projectToSave, HttpStatus.CREATED);
	}

}
