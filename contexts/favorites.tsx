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

        

        if(data){
            console.log('here on something');
            console.log(oldLeagues);
            console.log(data);
            
            

            const exists=oldLeagues.some(item=>item.id ===league.id);

            if(exists){
                console.log('ja existe');
                handleRemoveFavoriteLeague(league);
                
            }
            
            await AsyncStorage.setItem(
                keys.storage.leagues,
                JSON.stringify([
                  ...newArray,
                  ...oldLeagues,
                ])
              );
    
           
            setFavoriteLeagues([...newArray,...oldLeagues]);
        }else{
            console.log('her on empty');
            
            await AsyncStorage.setItem(
                keys.storage.leagues,
                JSON.stringify(
                  newArray
                 
                )
              );
    
           
            setFavoriteLeagues(newArray);
        }
        
        console.log(favoriteLeagues);
        

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
            const data = await AsyncStorage.getItem(keys.storage.teams);
        const oldTeams = data ? JSON.parse(data) : {};

        

        if(data){
            console.log('here on something');
            console.log(oldTeams);
            console.log(data);
            
            

            const exists=oldTeams.some(item=>item.team.id ===team.team.id);

            if(exists){
                console.log('ja existe');
                handleRemoveFavoriteLeague(team);
                
            }
            
            await AsyncStorage.setItem(
                keys.storage.teams,
                JSON.stringify([
                  ...newArray,
                  ...oldTeams,
                ])
              );
    
           
            setFavoriteTeams([...newArray,...oldTeams]);
        }else{
            console.log('her on empty');
            
            await AsyncStorage.setItem(
                keys.storage.teams,
                JSON.stringify(
                  newArray
                 
                )
              );
    
           
            setFavoriteLeagues(newArray);
        }
        
        console.log(favoriteTeams);
        

        }catch(error){
            throw new Error(error);
        }

    }

    const handleRemoveFavoriteLeague=async(league)=>{
        const data = await AsyncStorage.getItem(keys.storage.leagues);
        const leagues = data ? JSON.parse(data) : {};

        

        // delete leagues[league];

        const newLeagues=leagues.filter(item=>item.id !==league.id);

        await AsyncStorage.setItem(
         keys.storage.leagues,
          JSON.stringify(newLeagues)
        );
        setFavoriteLeagues(newLeagues);
        console.log(newLeagues);
        
    }

    const handleRemoveFavoriteTeam=async(team)=>{
        const data = await AsyncStorage.getItem(keys.storage.teams);
        const teams = data ? JSON.parse(data) : {};

        

        // delete teams[team];
        const newTeams=teams.filter(item=>item.team.id !==team.team.id);

        await AsyncStorage.setItem(
         keys.storage.teams,
          JSON.stringify(newTeams)
        );
        setFavoriteTeams(newTeams)
    }

    const getIsFavoriteLeague=(league)=>{
         AsyncStorage.getItem(keys.storage.leagues).then((data)=>{
            const leagues = data ? JSON.parse(data) : {};

            if(data){
                const exists=leagues.some(item=> item.id ===league.id);
                if(exists){
                    console.log('is liked');
                    
                    return true
                }else{
                    console.log('is unliked');
                    
                    return false
                }
            }else{
                console.log('is unliked new');
                return false
            }
        })
        
        
    }

    const getIsFavoriteTeam=(team)=>{
        
            AsyncStorage.getItem(keys.storage.teams).then((data)=>{
                const teams = data ? JSON.parse(data) : {};
                if(data){
                    const exists=team.some(item=> item.team.id ===team.team.id);
                    if(exists){
                        
                        return true
                    }else{
                        return false
                    }
                }else{
                    return false
                }
            }).catch(error=>console.log('error:',error)
            )
        
        

        
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

    const clearFavorites=async()=>{
        try {
            console.log('removendo..');
            
            await AsyncStorage.multiRemove([keys.storage.leagues,keys.storage.teams]);
            console.log('removidos');
            
          } catch(e) {
            // remove error
            console.log('erro ao remover', e);
            
          }
    }
    
    return(
        <FavoritesContext.Provider value={{favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,
        handleRemoveFavoriteLeague,handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam,getFavoriteLeagueList,getFavoriteTeamList,
        clearFavorites}}>
            {children}
        </FavoritesContext.Provider>
    )
}

export function useFavorites(){
    const context=useContext(FavoritesContext);
    const {favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,handleRemoveFavoriteLeague,
        handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam,getFavoriteLeagueList,getFavoriteTeamList,clearFavorites}=context;
        //custom Context
    return {favoriteLeagues,favoriteTeams,handleNewFavoriteLeague,handleNewFavoriteTeam,handleRemoveFavoriteLeague,
        handleRemoveFavoriteTeam,getIsFavoriteLeague,getIsFavoriteTeam,getFavoriteLeagueList,getFavoriteTeamList,clearFavorites}
}