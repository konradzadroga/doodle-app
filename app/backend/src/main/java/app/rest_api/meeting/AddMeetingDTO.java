package app.rest_api.meeting;

import app.rest_api.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AddMeetingDTO {
    private String name;
    private String location;
    private String description;
    private List<String> usernames;
    private Date proposedStartDate;
    private int proposedStartTime;
    private int proposedEndTime;
}
