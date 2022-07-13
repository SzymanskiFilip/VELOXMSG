package eu.filip.backend.socket;

import eu.filip.backend.service.UserService;
import eu.filip.backend.util.JwtUtil;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

import static eu.filip.backend.util.ConsoleColors.TEXT_RESET;
import static eu.filip.backend.util.ConsoleColors.TEXT_YELLOW;

@Service
public class CustomHandshakeInterceptor implements ChannelInterceptor {

    private JwtUtil jwtUtil;
    private UserService userService;

    public CustomHandshakeInterceptor(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(StompCommand.CONNECT.equals(accessor.getCommand())){
            System.out.println(TEXT_YELLOW + "CONNECTING" + TEXT_RESET);
        }
        return message;
    }
}
