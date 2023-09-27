import CreateCampaign from "./component/CreateCampaign";
import Header from "./component/Header";
import useCampaigns from "./hooks/useCampaigns";

function App() {
    const { contractInstance, contractData, loading } = useCampaigns();
    return (
        <div className="App">
            <Header />
            <main className="mt-10">
                <CreateCampaign />
            </main>
            <div>
                {
                    loading
                        ? "Loading..."
                        : <div>
                            {contractData.map((eachData) => (
                                <div>{eachData}</div>
                            ))}
                        </div>
                }
            </div>
        </div>
    );
}

export default App;
