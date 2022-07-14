package eu.filip.backend.socket;

import eu.filip.backend.dto.SocketMessageDto;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class SocketController {

    @MessageMapping("/send/{path}")
    @SendTo("/topic/{path}")
    public SocketMessageDto chat(@DestinationVariable String path, SocketMessageDto message){
        System.out.println(path);
        try{
            Thread.sleep(1000);
        } catch (Exception e){}
        return message;
    }
}
