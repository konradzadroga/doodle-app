package app.rest_api.meeting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetOccupiedDatesDTO {
    private int confirmedStartTime;
    private int confirmedEndTime;
}
