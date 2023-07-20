import React from "react";
import SessionIdInput from "./SessionIdInput";


class NewReportDialog extends React.Component{
  constructor(props){
    super(props);

    this.closeDialog = this.closeDialog.bind(this);
    this.onSessionIdSubmit = this.onSessionIdSubmit.bind(this);
  }

  closeDialog(e){
    this.props.closeDialog();
  }

  onSessionIdSubmit(sessionId){
    this.props.onSessionIdSubmit(sessionId);
    this.closeDialog();
  }

  render() {
    return (
      <div className="dialog-container">
        <div className="">
          <SessionIdInput onSessionIdSubmit={this.onSessionIdSubmit} />
          <span onClick={this.closeDialog} className="close">x</span>
        </div>
      </div>
    );
  }
}

export default NewReportDialog;