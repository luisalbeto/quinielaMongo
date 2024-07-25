'use client'
import {useGetMatchesList} from "@/app/hooks/useGetMatchesList";
import {FC, useMemo} from "react";
import { Loading } from "./Loading";
import MatchPrediction from "./MatchPrediction";


export interface MatchesResultProps{
    matchDay? : number
}
export const MatchesPrediction :FC<MatchesResultProps> = ({matchDay})=>{
    const { filterByMatchDay, matches}= useGetMatchesList()
    const data= useMemo(()=>matchDay ? filterByMatchDay(matchDay):matches ?? [],[filterByMatchDay, matchDay])
    if ( data.length < 1){
        return <div>
            <Loading/>
        </div>
    }

    console.log(data)
    return (

      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex rounded-sm">
      <div className="container mx-auto px-4 py-16">
      <div className="container mx-auto px-4">
                {data.map((match,index) => (
                    <MatchPrediction
                        key={index}
                        match={match}
                    />))}
            </div>   
    
    </div>
      </div>
       
    );
}

