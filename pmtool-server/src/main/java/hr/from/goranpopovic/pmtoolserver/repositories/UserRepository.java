package hr.from.goranpopovic.pmtoolserver.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import hr.from.goranpopovic.pmtoolserver.domain.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
	
	User findByUsername(String username);
	User getById(Long id);

}
