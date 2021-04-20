package app.rest_api.meeting;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FindOccupiedDatesDTO {

    private Date date;
    private List<String> usernames;

}
