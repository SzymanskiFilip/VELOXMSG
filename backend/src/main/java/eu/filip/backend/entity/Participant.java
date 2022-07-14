package eu.filip.backend.entity;

import javax.persistence.*;

@Table(name = "participants")
@Entity
public class Participant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(targetEntity = User.class)
    @JoinColumn(name = "user_id", foreignKey = @ForeignKey(name = "user_id"))
    private User user_id;

    @ManyToOne(targetEntity = Room.class)
    @JoinColumn(name = "room_id", foreignKey = @ForeignKey(name = "room_id"))
    private Room room_id;

    public Participant(Long id, User user_id, Room room_id) {
        this.id = id;
        this.user_id = user_id;
        this.room_id = room_id;
    }
    public Participant(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser_id() {
        return user_id;
    }

    public void setUser_id(User user_id) {
        this.user_id = user_id;
    }

    public Room getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Room room_id) {
        this.room_id = room_id;
    }
}
