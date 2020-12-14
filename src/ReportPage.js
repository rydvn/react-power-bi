import React, {Component} from 'react';
import { Report } from 'powerbi-report-component';
import {embedToken, reportID, reportUrl} from "./env";


class ReportPage extends Component {

    constructor(props) {
        super(props);
        this.report = null; // to store the loaded report's object to perform operations like print, full screen etc..
    }


    handleDataSelected = (data) => {
        // will be called when some chart or data element in your report clicked
    }

    handleReportLoad = (report) => {


        const filter = {
            $schema: "http://powerbi.com/product/schema#basic",
            target: {
                table: "DimStore",
                column: "storeid"
            },
            operator: "In",
            values: [1174]
        };

        report.setFilters([filter]).catch(function (errors) {
            console.log(errors);
        });
        this.report = report; // get the report object from callback and store it.(optional)

    }

    removeFilters = () =>
        this.report.removeFilters().catch(function (errors) {
            console.log(errors);
        });


    onLoad = (report) => {

        this.report = report;
    }


    handleReportRender = (report) => {




        this.report = report; // get the report object from callback and store it.(optional)
    }

    handlePageChange = (data) => {
        // will be called when pages in your report changes
    }

    handleTileClicked = (data) => {
        console.log('Data from tile', data);
    }




    render() {

        const extraSettings = {
            filterPaneEnabled: true, //true
            navContentPaneEnabled: false, //true
            hideErrors: false // Use this *only* when you want to override error experience i.e, use onError
            // ... more custom settings
        };

        return (
            <div>
                <div className="row">
                    <div className="btn-group" role="group" aria-label="Basic example">
                        <button disabled type="button" className="btn btn-light">Giriş yapan store: K.MARAŞ PIAZZA</button>
                        <button type="button" onClick={this.removeFilters} className="btn btn-danger">Filtreyi Kaldır</button>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <Report
                        tokenType="Aad" // "Aad"
                        accessToken={embedToken} // accessToken goes here
                        embedUrl={reportUrl} // embedUrl goes here
                        embedId={reportID} // report or dashboard Id goes here
                        pageName="" // set as current page of the report
                        reportMode="View" // open report in a particular mode View/Edit/Create

                        permissions="View" // View, For "Edit" mode permissions should be "All"
                        extraSettings={extraSettings}
                        onLoad={this.handleReportLoad}
                        onRender={this.handleReportRender} // not allowed in "Create" mode
                        onSelectData={this.handleDataSelected}
                        onPageChange={this.handlePageChange}
                        onTileClicked={this.handleTileClicked}
                        onSave={this.handleReportSave} // works for "Edit" and "Create"
                        style={{
                            height: '650px',
                            border: '1'
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default ReportPage;




