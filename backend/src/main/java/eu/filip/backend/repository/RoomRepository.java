package eu.filip.backend.repository;

import eu.filip.backend.entity.Room;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends CrudRepository<Room, Long> {
    @Query(nativeQuery = true, value = "select * from rooms inner join participants p on rooms.id = p.room_id where p.user_id = ?1")
    List<Room> getRoomsForUser(Long userId);
}
