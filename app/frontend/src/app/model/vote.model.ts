export interface GetVotesDTO {
    proposedDateId: number;
    usersWhoVoted: string[];
}

export interface VoteDTO {
    id: number;
    proposedDateId: number;
    voter: string;
}