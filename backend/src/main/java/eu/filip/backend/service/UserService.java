package eu.filip.backend.service;

import eu.filip.backend.entity.User;
import eu.filip.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserByUsername(String username){
        Optional<User> user = userRepository.findUserByUsername(username);
        if(user.isPresent()){
            return user.get();
        } else {
            throw new UsernameNotFoundException("No user with username: " + username + " exists");
        }
    }
}
