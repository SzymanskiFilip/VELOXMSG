package eu.filip.backend.dto;

public class MessageDto {
    private Long id;
    private Long room_id;
    private Long sender_id;
    private String message;
    private boolean me;

    public MessageDto(Long id, Long room_id, Long sender_id, String message, boolean me) {
        this.id = id;
        this.room_id = room_id;
        this.sender_id = sender_id;
        this.message = message;
        this.me = me;
    }

    public MessageDto(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Long room_id) {
        this.room_id = room_id;
    }

    public Long getSender_id() {
        return sender_id;
    }

    public void setSender_id(Long sender_id) {
        this.sender_id = sender_id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isMe() {
        return me;
    }

    public void setMe(boolean me) {
        this.me = me;
    }
}
