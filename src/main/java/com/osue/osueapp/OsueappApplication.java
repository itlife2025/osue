package com.osue.osueapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class OsueappApplication {

	public static void main(String[] args) {
		SpringApplication.run(OsueappApplication.class, args);
	}

}
