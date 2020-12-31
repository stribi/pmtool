package hr.from.goranpopovic.pmtoolserver.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import hr.from.goranpopovic.pmtoolserver.domain.User;
import hr.from.goranpopovic.pmtoolserver.repositories.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public User saveUser(User newUser) {
		newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
		
		//Username has to be unique
		
		//Make sure that password and confirmPassword match
		//We don't persist or show the confirmPassword
		
		return userRepository.save(newUser);
	}

}
