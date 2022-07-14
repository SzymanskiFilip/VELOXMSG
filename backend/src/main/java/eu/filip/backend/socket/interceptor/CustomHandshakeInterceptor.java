package eu.filip.backend.socket.interceptor;

import eu.filip.backend.entity.User;
import eu.filip.backend.service.UserDetailsServiceImpl;
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
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

import static eu.filip.backend.util.ConsoleColors.*;

@Service
public class CustomHandshakeInterceptor implements ChannelInterceptor {

    private JwtUtil jwtUtil;
    private UserDetailsServiceImpl userDetailsService;

    public CustomHandshakeInterceptor(JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        if(StompCommand.CONNECT.equals(accessor.getCommand())){
            System.out.println(TEXT_YELLOW + "CONNECTING" + TEXT_RESET);
            String token = accessor.getFirstNativeHeader("JWT_TOKEN");
            String name = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(name);
            if(jwtUtil.validateToken(token, userDetails)){
                return message;
            } else {
                System.out.println(TEXT_RED + "JWT NOT VALID, CONNECTION ABORTED" + TEXT_RESET);
                return null;
            }
        }
        return message;
    }
}
