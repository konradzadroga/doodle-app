export interface AddProposedDateDTO {
    proposedStartDate: Date;
    proposedStartTime: number;
    proposedEndTime: number;
}

export interface ProposedDateDTO {
    id: number;
    proposedStartDate: Date;
    proposedStartTime: number;
    proposedEndTime: number;
    proponentUsername: string;
    meetingId: number;
}