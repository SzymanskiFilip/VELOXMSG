package eu.filip.backend.socket;

import eu.filip.backend.dto.MessageDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class WSService {
    private final SimpMessagingTemplate messagingTemplate;

    public WSService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyFrontend(final String message){
        MessageDto messageDto = new MessageDto(message);
        messagingTemplate.convertAndSend("/topic/messages", messageDto);
    }
}
