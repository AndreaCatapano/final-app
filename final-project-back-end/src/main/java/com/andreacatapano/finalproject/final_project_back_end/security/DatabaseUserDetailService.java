package com.andreacatapano.finalproject.final_project_back_end.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.andreacatapano.finalproject.final_project_back_end.model.User;
import com.andreacatapano.finalproject.final_project_back_end.repository.UserRepository;

@Service
public class DatabaseUserDetailService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> userAttempt = repository.findByUsername(username);

        if (userAttempt.isEmpty()) {
            throw new UsernameNotFoundException("User non trovato: " + username);
        }

        return new DatabaseUserDetail(userAttempt.get());
    }

}
