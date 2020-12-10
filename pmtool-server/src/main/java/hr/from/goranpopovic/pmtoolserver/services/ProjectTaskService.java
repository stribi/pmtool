package hr.from.goranpopovic.pmtoolserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import hr.from.goranpopovic.pmtoolserver.domain.Backlog;
import hr.from.goranpopovic.pmtoolserver.domain.Project;
import hr.from.goranpopovic.pmtoolserver.domain.ProjectTask;
import hr.from.goranpopovic.pmtoolserver.exceptions.ProjectNotFoundException;
import hr.from.goranpopovic.pmtoolserver.repositories.BacklogRepository;
import hr.from.goranpopovic.pmtoolserver.repositories.ProjectRepository;
import hr.from.goranpopovic.pmtoolserver.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private BacklogRepository backlogRepository;

	@Autowired
	private ProjectTaskRepository projectTaskRepository;

	@Autowired
	private ProjectRepository projectRepository;

	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {

		try {
			// PTs to be added to a specific project, project != null, BL exists
			Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
			// set the BL to PT
			projectTask.setBacklog(backlog);
			// we want our project sequence to be like: IDPRO-1 IDPRO-2 ...100 101
			Integer BacklogSequence = backlog.getPTSequence();
			// update the BL SEQUENCE
			BacklogSequence++;
			backlog.setPTSequence(BacklogSequence);
			// add sequence to Project Task
			projectTask.setProjectSequence(backlog.getProjectIdentifier() + "-" + BacklogSequence);
			projectTask.setProjectIdentifier(projectIdentifier);

			// INTITIAL priority when priority null

			if (projectTask.getPriority() == null) {
				projectTask.setPriority(3);
			}

			// INITIAL status when status is null
			if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
				projectTask.setStatus("TODO");
			}

			return projectTaskRepository.save(projectTask);

		} catch (Exception e) {
			throw new ProjectNotFoundException("Project not Found");
		}

	}

	public Iterable<ProjectTask> findBacklogById(String id) {
		Project project = projectRepository.findByProjectIdentifier(id);
		if (project == null)
			throw new ProjectNotFoundException("Project with ID: '" + id + "' does not exist");
		return projectTaskRepository.findByProjectIdentifierOrderByPriority(id);
	}

	public ProjectTask findProjectTaskByProjectSequence(String backlog_id, String sequence) {
		// make sure we are searching on the right backlog
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlog_id);
		if (backlog == null)
			throw new ProjectNotFoundException("Project with ID: '" + backlog_id + "' does not exists");
		// make sure that our task exists
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
		if (projectTask == null)
			throw new ProjectNotFoundException("Project Task with ID: '" + sequence + "' does not exists");

		// make sure that backlog/project id in the path corresponds to the right
		// project
		if (!projectTask.getProjectIdentifier().equals(backlog_id)) {
			throw new ProjectNotFoundException(
					"Project Task '" + sequence + "' does not exists in project: '" + backlog_id + "'");
		}

		return projectTask;
	}
	
	public ProjectTask updateByProjectSequence(ProjectTask updatedTask, String backlog_id, String sequence) {
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(sequence);
		projectTask = updatedTask;
		return projectTaskRepository.save(projectTask);
	}
	

}
