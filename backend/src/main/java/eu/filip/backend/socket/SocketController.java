package eu.filip.backend.socket;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@Controller
public class SocketController {

    @MessageMapping("/hello/{path}")
    @SendTo("/topic/chat/{path}")
    public String chat(@DestinationVariable String path, String message){
        System.out.println("MESSAGE CAME IN");
        System.out.println(path);
        try{
            Thread.sleep(1000);
        } catch (Exception e){}
        return message;
    }
}
