package hr.from.goranpopovic.pmtoolserver.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.from.goranpopovic.pmtoolserver.domain.Project;
import hr.from.goranpopovic.pmtoolserver.services.MapValidationErrorsService;
import hr.from.goranpopovic.pmtoolserver.services.ProjectService;

@RestController
@RequestMapping("/api/v1/project")
public class ProjectController {
	
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private MapValidationErrorsService mapValidationErrorService;
	
	@PostMapping("")
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult result){
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Project projectToSave = projectService.saveOrUpdateProject(project);
		return new ResponseEntity<Project>(projectToSave, HttpStatus.CREATED);
	}

}
