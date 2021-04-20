package app.rest_api.meeting;

import app.rest_api.date.ProposedDate;
import app.rest_api.date.ProposedDateDTO;
import app.rest_api.user.User;
import app.rest_api.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MeetingDTO {
    private Long id;
    private String name;
    private String location;
    private String description;
    private Date confirmedStartDate;
    private int confirmedStartTime;
    private int confirmedEndTime;
    private Boolean confirmed;
    private List<UserDTO> users;
    private UserDTO organizer;
    private List<ProposedDateDTO> proposedDateDTOs;

    public MeetingDTO(Meeting meeting) {
        this.id = meeting.getId();
        this.name = meeting.getName();
        this.location = meeting.getLocation();
        this.description = meeting.getDescription();
        this.confirmedStartDate = meeting.getConfirmedStartDate();
        this.confirmedStartTime = meeting.getConfirmedStartTime();
        this.confirmedEndTime = meeting.getConfirmedEndTime();
        this.confirmed = meeting.getConfirmed();
        List<UserDTO> userDTOs = new ArrayList<>();
        List<User> users = meeting.getUsers();
        if (!users.isEmpty()) {
            users.forEach(user -> {
                userDTOs.add(new UserDTO(user));
            });
        }
        this.users = userDTOs;
        this.organizer = new UserDTO(meeting.getOrganizer());
        List <ProposedDateDTO> proposedDateDTOList = new ArrayList<>();
        List <ProposedDate> proposedDates = meeting.getProposedDates();
        if (!proposedDates.isEmpty()) {
            proposedDates.forEach(proposedDate -> {
                proposedDateDTOList.add(new ProposedDateDTO(proposedDate));
            });
        }
        this.proposedDateDTOs = proposedDateDTOList;
    }

}
