export const genAiLocal = ()=>{
    if(!localStorage.getItem('genaiConfig')){
        return false
    }else{
        return true
    }
}

export const activityLocal = ()=>{
    if(!localStorage.getItem('activities')){
        return false
    }else{
        return true
    }
}

export const eventLocal = ()=>{
    if(!localStorage.getItem('events')){
        return false
    }else{
        return true
    }
}