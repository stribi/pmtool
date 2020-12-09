package hr.from.goranpopovic.pmtoolserver.repositories;

import org.springframework.data.repository.CrudRepository;

import hr.from.goranpopovic.pmtoolserver.domain.ProjectTask;

public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {

}
