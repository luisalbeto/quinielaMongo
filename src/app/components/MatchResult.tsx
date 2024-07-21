'use client'
import React, {FC} from 'react';
import {Match} from "@/app/types/contanst.type";



export interface MatchResultProps{
  match:Match
}

const MatchResult :FC<MatchResultProps>= ({ match }) => {
  

  return (
<div className="bg-blue/80 shadow-md p-4 flex flex-col items-center gap-4 rounded-sm mt-4 md:flex-row md:justify-between md:items-center md:gap-8 lg:w-3/4 xl:w-2/3 mx-auto">
  <div className="match-info flex flex-col md:flex-row md:items-center md:justify-between py-4 px-4 w-full">
    <div className="team-info flex items-center mb-4 md:mb-0">
      <img src={match.flag1} alt={match.team1} className="team-flag w-10 h-10 rounded-full mr-4" />
      <span className="team-name text-black font-bold mr-4">{match.team1}</span>
    </div>
    <div className="match-score text-black font-bold text-2xl flex-1 flex items-center justify-center md:justify-self-center">
      {match.score1 ? (
        <div>
          <span>{match.score1}</span>
          <span className="mx-2">-</span>
          <span>{match.score2}</span>
        </div>
      ) : (
        <div></div>
      )}
    </div>
    <div className="team-info flex items-center mt-4 md:mt-0">
      <span className="team-name text-black font-bold ml-4">{match.team2}</span>
      <img src={match.flag2} alt={match.team2} className="team-flag w-10 h-10 rounded-full ml-4" />
    </div>
  </div>
  <div className="match-date text-black text-center">
    <span>{match.date}</span>
  </div>
</div>
  
   
  );
};

export default MatchResult;