package eu.filip.backend.socket;

import eu.filip.backend.service.UserDetailsServiceImpl;
import eu.filip.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class AuthenticationChannelInterceptor implements ChannelInterceptor {

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    private final static String JWT_COOKIE_NAME = "JWT_TOKEN";

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        final StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        assert accessor != null;

        if(accessor.getCommand() == StompCommand.CONNECT){
            final String JWT = accessor.getFirstNativeHeader(JWT_COOKIE_NAME);

            String username = jwtUtil.extractUsername(JWT);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            boolean status = jwtUtil.validateToken(JWT, userDetails);
            if(status){
                Principal principal = new Principal() {
                    @Override
                    public String getName() {
                        return username;
                    }
                };
                accessor.setUser(principal);
            }
        }

        return message;
    }
}
