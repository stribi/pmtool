package hr.from.goranpopovic.pmtoolserver.controllers;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
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
	public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
			@PathVariable String backlog_id, Principal principal) {

		ResponseEntity<?> errorMap = mapValidationService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;

		ProjectTask projectTaskToAdd = projectTaskService.addProjectTask(backlog_id, projectTask, principal.getName());
		return new ResponseEntity<ProjectTask>(projectTaskToAdd, HttpStatus.CREATED);

	}

	@GetMapping("/{backlog_id}")
	public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id) {
		return projectTaskService.findBacklogById(backlog_id);

	}

	@GetMapping("/{backlog_id}/{pt_sequence}")
	public ResponseEntity<?> getPTByProjectSequence(@PathVariable String backlog_id, @PathVariable String pt_sequence) {
		ProjectTask projectTask = projectTaskService.findProjectTaskByProjectSequence(backlog_id, pt_sequence);
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}

	@PatchMapping("/{backlog_id}/{pt_sequence}")
	public ResponseEntity<?> updateProjectTask(@Valid @RequestBody ProjectTask projectTask, BindingResult result,
			@PathVariable String backlog_id, @PathVariable String pt_sequence) {
		
		ResponseEntity<?> errorMap = mapValidationService.MapValidationService(result);
		if (errorMap != null)
			return errorMap;
		
		ProjectTask updatedProjectTask = projectTaskService.updateByProjectSequence(projectTask, backlog_id, pt_sequence);
		
		return new ResponseEntity<ProjectTask>(updatedProjectTask, HttpStatus.OK);
	}
	
	@DeleteMapping("/{backlog_id}/{pt_sequence}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable String backlog_id, @PathVariable String pt_sequence){
		projectTaskService.deleteProjectTaskByProjectSequence(backlog_id, pt_sequence);
		
		return new ResponseEntity<String>("Project Task with ID: '" + pt_sequence + "' was deleted successfully", HttpStatus.OK);
		
	}
}
