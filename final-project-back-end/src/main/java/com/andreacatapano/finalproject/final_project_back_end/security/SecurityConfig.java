package com.andreacatapano.finalproject.final_project_back_end.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(requests -> requests
                // Pagine pubbliche
                .requestMatchers("/", "/login", "/css/**", "/js/**", "/images/**", "/api/**")
                .permitAll()

                // Solo ADMIN
                .requestMatchers(
                        "/plants/create", "/plants/update/**", "/plants/delete/**")
                .hasAuthority("ADMIN")
                // USER e ADMIN
                .requestMatchers(
                        "/plants/**")
                .hasAnyAuthority("USER", "ADMIN")

                // Tutto il resto richiede autenticazione
                .anyRequest().authenticated())

                .authenticationProvider(authenticationProvider())
                .formLogin(login -> login.permitAll())
                .cors(cors -> cors.disable())
                .csrf(csrf -> csrf.disable());

        return http.build();
    }

    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(userDetailService());
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    DatabaseUserDetailService userDetailService() {
        return new DatabaseUserDetailService();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
