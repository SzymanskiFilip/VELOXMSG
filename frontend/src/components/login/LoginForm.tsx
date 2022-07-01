function LoginForm(): JSX.Element{

    function requestLogin(): void{
        console.log("hello")
        //get jwt token from input
        //save in cookies
    }

    return(
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-white">Username</h1>
            <input type="text" className="rounded-full p-2 outline-none"/>
            <h1 className="text-white">Password</h1>
            <input type="password" className="rounded-full p-2 outline-none"/>
            <button className="bg-white rounded-full p-2 mt-2 px-4" onClick={requestLogin}>Sign in</button>
        </div>
    );
}

export default LoginForm;