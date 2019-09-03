import React from 'react';

export default function PosRegistration () {
    return (
        <React.Fragment>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Terminals Registration</h1>
            </div>
            <div className="row">
                <div className="col-md-6">
                    <form>
                        <div className="form-group">
                            <p>Terminal Id</p>
                            <input htmlFor="TerminalID" className="form-control" />
                        </div>
                        <div className="form-group">
                            <p>Terminal Type</p>
                            <input htmlFor="TerminalType" className="form-control" />
                        </div>
                        <div className="form-group">
                            <p>Terminal Version</p>
                            <input htmlFor="TerminalVersion" className="form-control" />
                        </div>
                        <div className="form-group">
                            <p>Terminal App Version</p>
                            <input htmlFor="TerminalAppVersion" className="form-control" />
                        </div>                  
                        <div className="form-group">
                            <input type="submit" value="Create" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </React.Fragment>
    )
}
