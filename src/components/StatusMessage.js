import React, { useState, useEffect } from "react";

import '../assets/css/status-message-animation.css';


function StatusMessage(props){
    const natureClass = props.success ? 'success' : 'failure';
    const statusClass = "message visible " + natureClass;

    return (
        <div className="animate-status-message">
            <form>
                <div className={statusClass}>
                    <span>
                        Task status: {props.status}
                    </span>
                    <br />
                    <span>
                        Message: {props.message}
                    </span>
                </div>
            </form>
        </div>
    );
}

export default StatusMessage;