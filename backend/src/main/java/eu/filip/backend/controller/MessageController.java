package eu.filip.backend.controller;

import eu.filip.backend.dto.MessageDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@Controller
public class MessageController {

    //TODO: CREATE A ROUTE TO SEND MESSAGE TO A CHATROOM

    // handles /app/chat spring adds /app
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public MessageDto getMessages(MessageDto dto){
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return dto;
    }

    @MessageMapping("/private/chat")
    @SendToUser("/topic/private-messages")
    public MessageDto getPrivateMessage(MessageDto dto, final Principal principal){
        System.out.println("PRIVATE MESSAGE");
        System.out.println(principal.getName());
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        dto.setMessage(dto.getMessage() + " PRIVATE FROM " + principal.getName());
        return dto;
    }
}
