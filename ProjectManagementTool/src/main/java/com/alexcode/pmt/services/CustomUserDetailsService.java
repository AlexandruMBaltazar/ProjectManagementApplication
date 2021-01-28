package com.alexcode.pmt.services;

import com.alexcode.pmt.domain.User;
import com.alexcode.pmt.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/*
This is a good place where I could build a UserDetailsService
This UserDetailsService will take an object of type UserDetails that's why the User class implements the UserDetails interface
The UserDetailsService will load the User by the username and it can throw an user not found exception or returns a UserDetails object
This is what Spring Security uses to perform authentication
 */

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) throw new UsernameNotFoundException("User not found");

        return user;
    }

    @Transactional
    public User loadUserById(Long id) {
        User user = userRepository.getById(id);

        if (user == null) throw new UsernameNotFoundException("User not found");

        return user;
    }
}
