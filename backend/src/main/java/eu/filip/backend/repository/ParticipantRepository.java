package eu.filip.backend.repository;

import eu.filip.backend.entity.Participant;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParticipantRepository extends CrudRepository<Participant, Long> {

    @Query(nativeQuery = true, value = "select * from participants where user_id = 1 and room_id = 1")
    Optional<Participant> findByUserIdAndRoomId(Long userId, Long roomId);
}
