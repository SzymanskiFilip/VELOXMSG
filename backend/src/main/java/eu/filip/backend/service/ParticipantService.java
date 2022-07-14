package eu.filip.backend.service;

import eu.filip.backend.entity.Participant;
import eu.filip.backend.repository.ParticipantRepository;
import org.springframework.stereotype.Service;

@Service
public class ParticipantService {

    private ParticipantRepository participantRepository;

    public ParticipantService(ParticipantRepository participantRepository) {
        this.participantRepository = participantRepository;
    }

    public boolean isUserInRoom(Long userId, Long roomId){
        if(participantRepository.findByUserIdAndRoomId(userId, roomId).isPresent()){
            return true;
        }
        return false;
    }
}
