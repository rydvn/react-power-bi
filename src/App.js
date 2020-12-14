import React, {Component} from 'react';
import ReportPage from "./ReportPage";

class App extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <br/>
                    <h2>Colins Power BI Report</h2>
                    <ReportPage/>
                </div>
            </div>
        );
    }
}

export default App;