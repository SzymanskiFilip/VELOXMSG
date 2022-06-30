function Login(): JSX.Element{
    return(
        <div className="bg-black flex flex-col h-screen lg:flex-row">

            <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-1/2 lg:bg-white">
                <h1 className="text-white font-bold ml-6 mr-6 mt-6 text-2xl lg:text-black">Velox Messenger, just connect...</h1>
            </div>


            <div className="lg:flex lg:flex-col lg:items-center lg:justify-center lg:w-1/2">
                <h2 className="text-white font-bold mt-12 text-center">Join the Velox Messenger</h2>
                <div className="flex flex-row items-center justify-center">
                    <button className="text-black bg-white rounded-full px-12 py-2 mt-2 mb-2">Register</button>
                </div>

                <div className="flex flex-row items-center justify-center">
                    <div className="h-px w-1/3 bg-white mr-2 lg:w-36"></div>
                    <p className="text-white text-center">or</p>
                    <div className="h-px w-1/3 bg-white ml-2 lg:w-36"></div>
                </div>

                <p className="text-white text-center mt-4">If you already have an account</p>
                <div className="flex flex-row items-center justify-center pb-12">
                    <button className="text-black bg-white rounded-full px-12 py-2 mt-2 mb-2">Sign in</button>
                </div>
            </div>

        </div>
    );
}

export default Login;