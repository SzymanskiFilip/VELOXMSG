function Home(): JSX.Element{
    //TODO: on the bottom a random chat button
    return(
        <div>
            <nav className="bg-black text-white text-center font-bold flex flex-row items-center justify-between pt-4 pb-4">
                <div className="w-6 ml-4">
                    <div className="bg-white w-6 mb-1 height"></div>
                    <div className="bg-white w-6 mb-1 height"></div>
                    <div className="bg-white w-6 mb-1 height"></div>
                </div>

                <h1 className="absolute left-1/2 transform -translate-x-1/2">VELOXMSG</h1>
            </nav>

        </div>
    );
}

export default Home;