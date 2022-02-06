import React,{ createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import keys from "../lib/keys";

export const FavoritesContext=createContext([]);

export default function FavoritesProvider({children}){
    // declarando states do cliente
    
    const [favoriteLeagues,setFavoriteLeagues]=useState([]);
    const [favoriteTeams,setFavoriteTeams]=useState([]);
    

    const handleNewFavoriteLeague=async(league)=>{
        const newArray=[];
        newArray.push(league);
        
        // console.log(favoriteLeagues);

        try{
            const data = await AsyncStorage.getItem(keys.storage.leagues);
        const oldLeagues = data ? JSON.parse(data) : {};



        await AsyncStorage.setItem(
            keys.storage.leagues,
            JSON.stringify({
              ...newArray,
              ...oldLeagues,
            })
          );

        //   setFavoriteLeagues(oldArray=>[...oldArray,...newArray]);
        setFavoriteLeagues(oldArray=>[...newArray,
            ...oldLeagues]);

        }catch(error){
            throw new Error(error);
        }
        
    }

    const handleNewFavoriteTeam=async(team)=>{
        const newArray=[];
        newArray.push(team);
        // setFavoriteTeams(oldArray=>[...oldArray,...newArray]);
        // console.log(favoriteTeams);
        

        try{
            const data = await AsyncStorage.getItem(keys.storage);
            const oldTeams = data ? JSON.parse(data) : {};



        await AsyncStorage.setItem(
            keys.storage.teams,
            JSON.stringify({
              ...newArray,
              ...oldTeams,
            })
          );
          setFavoriteTeams([...oldTeams,...newArray]);
        }catch(error){
            throw new Error(error);
        }

    }

    const handleRemoveFavoriteLeague=async(league)=>{
        const data = await AsyncStorage.getItem(keys.storage);
        const leagues = data ? JSON.parse(data) : {};

        

        delete leagues[league];

        await AsyncStorage.setItem(
         keys.storage.leagues,
          JSON.stringify(leagues)
        );
        setFavoriteLeagues(leagues);
    }

    const handleRemoveFavoriteTeam=async(team)=>{
        const data = await AsyncStorage.getItem(keys.storage);
        const teams = data ? JSON.parse(data) : {};

        

        delete teams[team];

        await AsyncStorage.setItem(
         keys.storage.teams,
          JSON.stringify(teams)
        );
        setFavoriteTeams(teams)
    }

    const getIsFavoriteLeague=async(league)=>{
        const data = await AsyncStorage.getItem(keys.storage.teams);
        const teams = data ? JSON.parse(data) : {};

        if(teams.includes(league)){
            return true
        }else{
            return false
        }
    }

    const getIsFavoriteTeam=async(team)=>{
        const data = await AsyncStorage.getItem(keys.storage.teams);
        const teams = data ? JSON.parse(data) : {};

        if(teams.includes(team)){
            return true
        }else{
            return false
        }
    }

    const getFavoriteLeagueList=async()=>{
        const data = await AsyncStorage.getItem(keys.storage.leagues);
        const leagues = data ? JSON.parse(data) : {};
        setFavoriteLeagues(leagues);
        return leagues;
    }
    const getFavoriteTeamList=async()=>{
        const data = await AsyncStorage.getItem(keys.storage.teams);
        const teams = data ? JSON.parse(data) : {};
        setFavoriteTeams(teams);
        return teams;
    }
    
    return(
        <FavoritesContext.Provider value={{favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,
        handleRemoveFavoriteLeague,handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam,getFavoriteLeagueList,getFavoriteTeamList}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites(){
    const context=useContext(FavoritesContext);
    const {favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,handleRemoveFavoriteLeague,
        handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam,getFavoriteLeagueList,getFavoriteTeamList}=context;
        //custom Context
    return {favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,handleRemoveFavoriteLeague,
        handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam,getFavoriteLeagueList,getFavoriteTeamList}
}