"use client";

import {useCallback, useEffect, useMemo, useState} from "react";
import {Match, MatchApi, RootApiResponse} from "@/app/types/contanst.type";
export interface FlagTeam{
    country: string,
    nameImage:string
}
export const useGetMatchesList = () => {
    const [matches, setMatches] = useState<Array<Match> | null>(null);

    const flagsMatch = useMemo(() => ([
        { nameImage: 'uruguai', country: 'Uruguay' },
        { nameImage: 'brasil', country: 'Brazil' },
        { nameImage: 'paraguai', country: 'Paraguay' },
        { nameImage: 'equador', country: 'Ecuador' }
    ]), []);

    const nameCountry = useCallback((country: string) => {
        const findCountrySpecial = flagsMatch.find(item => item.country === country);
        const countryImage = findCountrySpecial ? findCountrySpecial.nameImage : country.toLowerCase();
        return `https://copaamerica.com/_next/image?url=%2Fflags%2F${countryImage}.png&w=32&q=75`;
    }, [flagsMatch]);

    const filterByMatchDay = useCallback((matchDay: number) => {
        return matches ? matches.filter(match => match.matchDay == matchDay) : [];
    }, [matches]);

    useEffect(() => {
        fetch('https://backend.copaamerica.com/api/opta/match-list')
            .then(res => res.json())
            .then((data: unknown) => {
                const res = data as RootApiResponse;
                const matchesMap: Array<Match> = [];
                res.matches.forEach((match: MatchApi) => {
                    matchesMap.push({
                        id: match.matchId,
                        team1: match.teamData.home.team,
                        team2: match.teamData.away.team,
                        flag1: nameCountry(match.teamData.home.team),
                        flag2: nameCountry(match.teamData.away.team),
                        score1: match.teamData.home.Score,
                        score2: match.teamData.away.Score,
                        date: match.date,
                        matchDay: match.matchDay ?? ''
                    });
                });
                setMatches(matchesMap);
            })
            .catch(error => {
                console.error('Error fetching match list:', error);
                setMatches([]);
            });
    }, [nameCountry]);

    return {
        matches,
        filterByMatchDay
    };
};