import React from "react";


class SessionIdInput extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {sessionId: ''};
    
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e){
        this.setState({sessionId: e.target.value});
      }
    
    onFormSubmit(e){
      this.props.onSessionIdSubmit(this.state.sessionId);
      e.preventDefault();
    }

    render(){
        return (
            <form onSubmit={this.onFormSubmit}>
                <span className="label">Please input Session ID.</span>
                <div style={{width: '100%'}} />
                <input onChange={this.handleInputChange} value={this.state.sessionId} type="text" required />
                <div style={{width: '100%'}} />
                <input type="Submit" />
            </form>
        );
    }
}


export default SessionIdInput;