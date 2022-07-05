package eu.filip.backend.controller;

import eu.filip.backend.dto.MessageDto;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@Controller
public class MessageController {

    // handles /app/chat spring adds /app
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public MessageDto getMessages(MessageDto dto, HttpServletRequest request){
        System.out.println(request.getRemoteAddr() + " has sent a mesage: " + dto.getMessage());
        dto.setMessage("RESPONSE - " + dto.getMessage());
        return dto;
    }
}
