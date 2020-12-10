package hr.from.goranpopovic.pmtoolserver.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.from.goranpopovic.pmtoolserver.domain.ProjectTask;
import hr.from.goranpopovic.pmtoolserver.services.MapValidationErrorsService;
import hr.from.goranpopovic.pmtoolserver.services.ProjectTaskService;

@RestController
@RequestMapping("api/v1/backlog")
@CrossOrigin
public class BacklogController {
	
	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private MapValidationErrorsService mapValidationService;
	
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,
			BindingResult result, @PathVariable String backlog_id){
		
		ResponseEntity<?> errorMap = mapValidationService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		ProjectTask projectTaskToAdd = projectTaskService.addProjectTask(backlog_id, projectTask);
		return new ResponseEntity<ProjectTask>(projectTaskToAdd, HttpStatus.CREATED);
		
	}
	@GetMapping("/{backlog_id}")
	public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id){
		return projectTaskService.findBacklogById(backlog_id);
		
	}
}
