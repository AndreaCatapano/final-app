package com.andreacatapano.finalproject.final_project_back_end.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(requests -> requests
                // API pubbliche
                .requestMatchers("/api/**").permitAll()

                // Solo ADMIN
                .requestMatchers("/plants/create", "/plants/update/**", "/plants/delete/**").hasAuthority("ADMIN")
                .requestMatchers("/treatments/create", "/treatments/update/**", "/treatments/delete/**")
                .hasAuthority("ADMIN")
                .requestMatchers("/characteristics/create", "/characteristics/update/**", "/characteristics/delete/**")
                .hasAuthority("ADMIN")

                // USER e ADMIN
                .requestMatchers("/plants/**").hasAnyAuthority("USER", "ADMIN")
                .requestMatchers("/treatments/**").hasAnyAuthority("USER", "ADMIN")

                // Risorse pubbliche
                .requestMatchers("/", "/login", "/css/**", "/js/**", "/images/**").permitAll()

                // Tutto il resto richiede autenticazione
                .anyRequest().authenticated())

                .formLogin(Customizer.withDefaults())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable());

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:5173");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
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