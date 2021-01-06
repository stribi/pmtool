package hr.from.goranpopovic.pmtoolserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class PmtoolServerApplication {
	
	 @Bean
	    BCryptPasswordEncoder bCryptPasswordEncoder(){
	        return new BCryptPasswordEncoder();
	    }

	public static void main(String[] args) {
		SpringApplication.run(PmtoolServerApplication.class, args);
	}

}
