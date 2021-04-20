package app.rest_api.meeting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetFreeTimeSlotsDTO {
    int time;
    boolean isTimeSlotFree;
}
