package hr.from.goranpopovic.pmtoolserver.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hr.from.goranpopovic.pmtoolserver.domain.User;
import hr.from.goranpopovic.pmtoolserver.payload.JWTLoginSuccessResponse;
import hr.from.goranpopovic.pmtoolserver.payload.LoginRequest;
import hr.from.goranpopovic.pmtoolserver.security.JwtTokenProvider;
import hr.from.goranpopovic.pmtoolserver.services.MapValidationErrorsService;
import hr.from.goranpopovic.pmtoolserver.services.UserService;
import hr.from.goranpopovic.pmtoolserver.validator.UserValidator;
import static hr.from.goranpopovic.pmtoolserver.security.SecurityConstants.TOKEN_PREFIX;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin
public class UserController {

	@Autowired
	private MapValidationErrorsService mapValidationErrorService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserValidator userValidator;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
				loginRequest.getUsername(),
				loginRequest.getPassword()
				));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);
		return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt));
		
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
		//Validate passwords match
		userValidator.validate(user, result);
		
		ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
		if(errorMap != null) return errorMap;
		
		User newUser = userService.saveUser(user);
		return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
	}
	
}
