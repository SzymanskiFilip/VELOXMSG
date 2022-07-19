package eu.filip.backend.service;

import eu.filip.backend.dto.MessageDto;
import eu.filip.backend.entity.Message;
import eu.filip.backend.entity.Room;
import eu.filip.backend.entity.User;
import eu.filip.backend.repository.RoomRepository;
import eu.filip.backend.util.JwtUtil;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ChatDataService {
    private RoomRepository roomRepository;
    private UserService userService;
    private JwtUtil jwtUtil;
    private ParticipantService participantService;
    private MessageService messageService;

    public ChatDataService(RoomRepository roomRepository, UserService userService, JwtUtil jwtUtil, ParticipantService participantService, MessageService messageService) {
        this.roomRepository = roomRepository;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.participantService = participantService;
        this.messageService = messageService;
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

        if(isUserInChat){
            List<Message> messages = messageService.getMessages(roomId);
            List<MessageDto> messageDtos = new ArrayList<>();
            messages.forEach((message) -> {
                boolean me = false;
                if(user.getId() == message.getUser_id()){
                    me = true;
                }
                messageDtos.add(new MessageDto(
                        message.getId(),
                        message.getRoom_id(),
                        message.getUser_id(),
                        message.getSender_name(),
                        message.getMessage(),
                        me
                ));
            });

            return messageDtos;
        }
        return null;
    }

}
