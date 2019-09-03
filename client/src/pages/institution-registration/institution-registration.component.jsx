import React from 'react';

export default function InstitutionRegistration () {
    return (
        <React.Fragment>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <h1 className="h2">Institution Registration</h1>
            </div>
            <div className="row">
                <div className="col-md-12">
                <form>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant ID</p>
                            <input type="text" className="form-control" placeholder="Merchant ID" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Name</p>
                            <input type="text" className="form-control" placeholder="Merchant Name" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant Location</p>
                            <input type="text" className="form-control" placeholder="Merchant Location" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Email</p>
                            <input type="text" className="form-control" placeholder="Merchant Email" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant LGA</p>
                            <input type="text" className="form-control" placeholder="Merchant LGA" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Phone</p>
                            <input type="text" className="form-control" placeholder="Merchant Phone" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant DOB</p>
                            <input type="text" className="form-control" placeholder="Merchant DOB" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Gender</p>
                            <input type="text" className="form-control" placeholder="Merchant Gender" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant Type</p>
                            <input type="text" className="form-control" placeholder="Merchant Type" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant State</p>
                            <input type="text" className="form-control" placeholder="Merchant State" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant Address</p>
                            <input type="text" className="form-control" placeholder="Merchant Address" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Business Name</p>
                            <input type="text" className="form-control" placeholder="Merchant Business Name" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Acquiring Bank</p>
                            <input type="text" className="form-control" placeholder="Acquiring Bank" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Bank</p>
                            <input type="text" className="form-control" placeholder="Merchant Bank" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>BVN</p>
                            <input type="text" className="form-control" placeholder="BVN" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Account</p>
                            <input type="text" className="form-control" placeholder="Merchant Account" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>ID Type</p>
                            <input type="text" className="form-control" placeholder="ID Type" />
                        </div>
                        <div className="col-md-6">
                            <p>ID Number</p>
                            <input type="text" className="form-control" placeholder="ID Number" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Created By</p>
                            <input type="text" className="form-control" placeholder="Created By" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Wallet ID</p>
                            <input type="text" className="form-control" placeholder="Merchant Wallet ID" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Merchant Header</p>
                            <input type="text" className="form-control" placeholder="Merchant Header" />
                        </div>
                        <div className="col-md-6">
                            <p>Merchant Footer</p>
                            <input type="text" className="form-control" placeholder="Merchant Footer" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="col-md-6">
                            <p>Date Created</p>
                            <input type="text" className="form-control" placeholder="Date Created" />
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <input type="submit" value="Create" className="btn btn-primary" />
                    </div>
                </form>
        
                </div>
            </div>
        </React.Fragment>
    )
}
