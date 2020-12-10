package hr.from.goranpopovic.pmtoolserver.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import hr.from.goranpopovic.pmtoolserver.domain.ProjectTask;

public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
	
	List<ProjectTask> findByProjectIdentifierOrderByPriority(String id);

}
