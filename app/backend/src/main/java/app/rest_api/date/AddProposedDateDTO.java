package app.rest_api.date;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@AllArgsConstructor
@Data
public class AddProposedDateDTO {
    private Date proposedStartDate;
    private int proposedStartTime;
    private int proposedEndTime;
}
