package app.rest_api.date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProposedDateDTO {
    private long id;
    private Date proposedStartDate;
    private int proposedStartTime;
    private int proposedEndTime;
    private String proponentUsername;
    private long meetingId;

    public ProposedDateDTO(ProposedDate proposedDate) {
        this.id = proposedDate.getId();
        this.proposedStartDate = proposedDate.getProposedStartDate();
        this.proposedStartTime = proposedDate.getProposedStartTime();
        this.proposedEndTime = proposedDate.getProposedEndTime();
        this.proponentUsername = proposedDate.getProponent().getUsername();
        this.meetingId = proposedDate.getMeeting().getId();
    }
}
