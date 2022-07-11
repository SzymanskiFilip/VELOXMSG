package eu.filip.backend.controller;

import eu.filip.backend.entity.Room;
import eu.filip.backend.model.AuthCheckData;
import eu.filip.backend.model.AuthenticationResponse;
import eu.filip.backend.model.LoginCredentials;
import eu.filip.backend.repository.RoomRepository;
import eu.filip.backend.service.UserDetailsServiceImpl;
import eu.filip.backend.util.JwtUtil;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class Controller {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/authenticate")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginCredentials loginCredentials) throws Exception{

        Thread.sleep(3000);

        System.out.println("LOGIN CREDENTIALS = " + loginCredentials.getUsername() + loginCredentials.getPassword());
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginCredentials.getUsername(),
                            loginCredentials.getPassword()
                    )
            );
        } catch (Exception e){
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginCredentials.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwt));
    }

    @PostMapping("/check")
    public ResponseEntity<?> checkAuthentication(@RequestBody String token){
        try{
            UserDetails userDetails = userDetailsService.loadUserByUsername(jwtUtil.extractUsername(token));
            boolean status = jwtUtil.validateToken(token, userDetails);
            if(status == true){
                return ResponseEntity.ok().build();
            }
        } catch (Exception e){
            System.out.println("TOKEN NOT VALID");
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }
}
