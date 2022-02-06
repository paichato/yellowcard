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
        setFavoriteLeagues(oldArray=>[...oldArray,...newArray]);
        console.log(favoriteLeagues);

        try{
            const data = await AsyncStorage.getItem(keys.storage);
        const oldLeagues = data ? JSON.parse(data) : {};



        await AsyncStorage.setItem(
            keys.storage,
            JSON.stringify({
              ...newArray,
              ...oldLeagues,
            })
          );
        }catch(error){
            throw new Error(error);
        }
        
    }

    const handleNewFavoriteTeam=async(team)=>{
        const newArray=[];
        newArray.push(team);
        setFavoriteTeams(oldArray=>[...oldArray,...newArray]);
        console.log(favoriteTeams);
        

        try{
            const data = await AsyncStorage.getItem(keys.storage);
            const oldTeams = data ? JSON.parse(data) : {};



        await AsyncStorage.setItem(
            keys.storage,
            JSON.stringify({
              ...newArray,
              ...oldTeams,
            })
          );
        }catch(error){
            throw new Error(error);
        }

    }

    const handleRemoveFavoriteLeague=async(league)=>{
        const data = await AsyncStorage.getItem(keys.storage);
        const leagues = data ? JSON.parse(data) : {};

        

        delete leagues[league];

        await AsyncStorage.setItem(
         keys.storage,
          JSON.stringify(leagues)
        );
    }

    const handleRemoveFavoriteTeam=async(team)=>{
        const data = await AsyncStorage.getItem(keys.storage);
        const teams = data ? JSON.parse(data) : {};

        

        delete teams[team];

        await AsyncStorage.setItem(
         keys.storage,
          JSON.stringify(teams)
        );
    }

    const getIsFavoriteLeague=async(league)=>{
        const data = await AsyncStorage.getItem(keys.storage);
        const teams = data ? JSON.parse(data) : {};

        if(teams.includes(league)){
            return true
        }else{
            return false
        }
    }

    const getIsFavoriteTeam=async(team)=>{
        const data = await AsyncStorage.getItem(keys.storage);
        const teams = data ? JSON.parse(data) : {};

        if(teams.includes(team)){
            return true
        }else{
            return false
        }
    }
    
    return(
        <FavoritesContext.Provider value={{favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,
        handleRemoveFavoriteLeague,handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites(){
    const context=useContext(FavoritesContext);
    const {favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,handleRemoveFavoriteLeague,handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam}=context;
        //custom Context
    return {favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,handleRemoveFavoriteLeague,handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam}
}