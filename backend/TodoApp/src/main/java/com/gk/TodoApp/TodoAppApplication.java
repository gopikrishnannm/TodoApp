package com.gk.TodoApp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TodoAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoAppApplication.class, args);
	}

	// @Bean
	// public WebMvcConfigurer corsConfigurer(){
	// 	return new WebMvcConfigurer(){
	// 		@Override
	// 		public void addCorsMappings(CorsRegistry registry){
	// 			registry.addMapping("/**")
	// 			.allowedMethods("*")
	// 			.allowedOrigins( "http://localhost:3000")
	// 			.allowedHeaders("*")
	// 			.exposedHeaders("Authorization")
	// 			.allowCredentials(true);

	// 		}
	// 	};
	// }



}
