package hr.from.goranpopovic.pmtoolserver.repositories;

import org.springframework.data.repository.CrudRepository;

import hr.from.goranpopovic.pmtoolserver.domain.Backlog;

public interface BacklogRepository extends CrudRepository<Backlog, Long> {
	
	Backlog findByProjectIdentifier(String identifier);

}
