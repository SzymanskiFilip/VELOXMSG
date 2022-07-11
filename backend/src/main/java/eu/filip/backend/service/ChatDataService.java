package eu.filip.backend.service;

import eu.filip.backend.entity.Room;
import eu.filip.backend.entity.User;
import eu.filip.backend.repository.RoomRepository;
import eu.filip.backend.util.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class ChatDataService {
    private RoomRepository roomRepository;
    private UserService userService;
    private JwtUtil jwtUtil;

    public ChatDataService(RoomRepository roomRepository, UserService userService, JwtUtil jwtUtil) {
        this.roomRepository = roomRepository;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    public List<Room> getRoomsForUser(Principal principal){
        String name = principal.getName();
        User user = userService.findUserByUsername(name);

        return roomRepository.getRoomsForUser(user.getId());
    }

}
