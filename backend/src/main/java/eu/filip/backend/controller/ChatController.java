package eu.filip.backend.controller;

import eu.filip.backend.entity.Room;
import eu.filip.backend.service.ChatDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
public class ChatController {
    private ChatDataService chatDataService;

    public ChatController(ChatDataService chatDataService) {
        this.chatDataService = chatDataService;
    }

    @GetMapping("/get-chats")
    public List<Room> getChats(Principal principal){
        return chatDataService.getRoomsForUser(principal);
    }
}
