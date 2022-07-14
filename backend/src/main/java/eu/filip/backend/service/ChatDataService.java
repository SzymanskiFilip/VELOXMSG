package eu.filip.backend.service;

import eu.filip.backend.dto.MessageDto;
import eu.filip.backend.entity.Room;
import eu.filip.backend.entity.User;
import eu.filip.backend.repository.RoomRepository;
import eu.filip.backend.util.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Arrays;
import java.util.List;

@Service
public class ChatDataService {
    private RoomRepository roomRepository;
    private UserService userService;
    private JwtUtil jwtUtil;
    private ParticipantService participantService;

    public ChatDataService(RoomRepository roomRepository, UserService userService, JwtUtil jwtUtil, ParticipantService participantService) {
        this.roomRepository = roomRepository;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.participantService = participantService;
    }

    public List<Room> getRoomsForUser(Principal principal){
        String name = principal.getName();
        User user = userService.findUserByUsername(name);

        return roomRepository.getRoomsForUser(user.getId());
    }

    public List<MessageDto> getMessagesForUserInRoom(Principal principal, Long roomId){
        String name = principal.getName();
        User user = userService.findUserByUsername(name);

        boolean isUserInChat = participantService.isUserInRoom(user.getId(), roomId);
        System.out.println(isUserInChat);

        return Arrays.asList();
    }

}
