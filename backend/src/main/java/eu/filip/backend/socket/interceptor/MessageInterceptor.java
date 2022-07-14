package eu.filip.backend.socket.interceptor;

import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.stereotype.Service;

import static eu.filip.backend.util.ConsoleColors.TEXT_PURPLE;
import static eu.filip.backend.util.ConsoleColors.TEXT_RESET;

@Service
public class MessageInterceptor implements ChannelInterceptor {
    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(accessor != null && StompCommand.SEND.equals(accessor.getCommand())){
            System.out.println(TEXT_PURPLE + "MESSAGE" + TEXT_RESET);
        }
        return message;
    }
}
