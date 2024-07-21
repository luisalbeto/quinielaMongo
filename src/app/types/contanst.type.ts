

export interface Match{
    id:number | string,
    team1:string,
    team2:string,
    flag1:string,
    flag2:string,
    score1?:string | number,
    score2?: string | number,
    date: string,
    matchDay : string | number
}


export interface RootApiResponse {
    name: string
    type: string
    teams: Team[]
    matches: MatchApi[]
    standings: Standing[]
    dateVersion: string
    detailTypes: DetailType[]
    timingTypes: TimingType[]
    timestampAccuracyTypes: TimestampAccuracyType[]
}

export interface Team {
    players: Player[]
    teamRef: string
    team_name: string
}

export interface Player {
    caps: string
    club: string
    name: string
    goals: string
    height: string
    weight: string
    country: string
    position: string
    join_date: string
    last_name: string
    birth_date: string
    first_name: string
    jersey_num: string
    birth_place?: string
    real_position: string
    preferred_foot?: string
    first_nationality: string
    real_position_side: string
    known_name?: string
    middle_name?: string
}

export interface MatchApi {
    date: string
    stats: Stats
    Period?: string
    matchId: string
    teamData: TeamData
    timeZone: string
    matchType: string
    spotm: Spotm
    match_slug?: string
    period?: string
    matchDay?: string
}

export interface Stats {
    Venue: string
    Neutral: string
    Attendance: string
}

export interface TeamData {
    away: Away
    home: Home
}

export interface Away {
    team: string
    Score: string
    TeamRef: string
    HalfTimeScore: string
    Side?: string
}

export interface Home {
    team: string
    Score?: string
    TeamRef: string
    HalfTimeScore: string
    Side?: string
}

export interface Spotm {
    spotmWinnerName?: string
    spotmWinnerPhoto?: string
}

export interface Standing {
    group: string
    matchDay: string
    groupName: string
    positions: Position[]
}

export interface Position {
    For: string
    Won: string
    Lost: string
    Drawn: string
    Played: string
    Points: string
    Against: string
    AwayFor: string
    AwayWon: string
    HomeFor: string
    HomeWon: string
    teamRef: string
    AwayLost: string
    HomeLost: string
    Position: string
    teamName: string
    AwayDrawn: string
    HomeDrawn: string
    AwayPlayed: string
    AwayPoints: string
    HomePlayed: string
    HomePoints: string
    AwayAgainst: string
    HomeAgainst: string
    AwayPosition: string
    HomePosition: string
    StartDayPosition: string
}

export interface DetailType {
    name: string
    detail_id: string
}

export interface TimingType {
    name: string
    timing_id: string
}

export interface TimestampAccuracyType {
    name: string
    timestamp_accuracy_id: string
}
