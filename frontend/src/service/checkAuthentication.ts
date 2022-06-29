import UserInterface from "../model/UserInterface";

function checkAuthentication(): UserInterface{
    //request
    let username: string = "david";
    let authenticated: boolean = true;

    return {username,authenticated};
}

export default checkAuthentication;