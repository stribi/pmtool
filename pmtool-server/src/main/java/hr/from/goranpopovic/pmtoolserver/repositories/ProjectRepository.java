package hr.from.goranpopovic.pmtoolserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hr.from.goranpopovic.pmtoolserver.domain.Project;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
	
	Project findByProjectIdentifier(String projectId);
	
	Iterable<Project> findAllByProjectLeader(String username);

}
