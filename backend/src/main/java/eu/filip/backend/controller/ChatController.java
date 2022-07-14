package eu.filip.backend.controller;

import eu.filip.backend.dto.MessageDto;
import eu.filip.backend.entity.Message;
import eu.filip.backend.entity.Room;
import eu.filip.backend.service.ChatDataService;
import org.hibernate.boot.archive.scan.spi.PackageInfoArchiveEntryHandler;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    @GetMapping("/chat/{id}")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable Long id, Principal principal){
        return ResponseEntity.ok(chatDataService.getMessagesForUserInRoom(principal, id));
    }



}
