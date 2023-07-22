import logo from './logo.svg';
import React, { useState, useEffect, Fragment } from "react";

import './App.css';
import './assets/css/overlay.css';

import CourseView from './components/CourseView';
import Header from './components/Header';
import CoursesNavigation from './components/CourseNavigation';
import StatusMessage from './components/StatusMessage';
import SessionIdInput from "./components/SessionIdInput";
import OpeningAnimation from "./components/OpeningAnimation";
import NavigationComponent from "./components/NavigationComponent";

import Cookies from 'js-cookie';


const apiUrl = "http://127.0.0.1:5000";
// const apiUrl = "https://cucourseview-huzaifafarooq412.b4a.run/";
const apiRequestHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
  };
const cookieExpireTimeHours = 60 * 60 * 1000  // 1 Hour


const App = () => {
  const [visibleCourseId, setVisibleCourseId] = useState(null);
  const [response, setResponse] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [isAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const sessionId = Cookies.get('sessionId');
    const key = Cookies.get('key');
    if (sessionId && key){
      setSessionId(sessionId);
      fetchData(sessionId, key);
    }
  }, []);

  useEffect(() => {
    const animationTimeout = setTimeout(() => {
      setAnimationComplete(true);
    }, 3000);

    return () => clearTimeout(animationTimeout);
  }, []);

  function fetchData(sessionId, key){
    if (!sessionId){
      return;
    }

    const params = new URLSearchParams({
      key: key
    });

    fetch(apiUrl + '/taskdata/' + sessionId + "?" + params, {
      headers : apiRequestHeaders,
        method: 'GET',
    })
    .then(response => response.json())
    .then(response => {
      if (response.error){
        setSessionId("");
        setResponse(response);
      }
      else if (!response.taskCompleted){
        setResponse(response);
        setTimeout(() => {
          fetchData(sessionId, key);
        } , 1000);
      }
      else{
        const responseData = response.data
        setResponse(responseData);
        setVisibleCourseId(responseData.courseIds[0]);

        const expirationTime = new Date(new Date().getTime() + (cookieExpireTimeHours));
        Cookies.set('sessionId', sessionId, { expires: expirationTime });
        Cookies.set('key', key, { expires: expirationTime });
      }
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }

  function submitTask(sessionId){
    fetch(apiUrl + '/task/' , {
        method: 'POST',
        headers : apiRequestHeaders,
        body: JSON.stringify({
            sessionId: sessionId
        })
    })
    .then(response => response.json())
    .then(response => {
        setTimeout(() => {
          fetchData(sessionId, response.key);
        } , 1000);
    })
    .catch(error => {
      setResponse({
        message: "Failed to send fetch request.",
        error: error,
        status: "Failed"
      });
    });
  }

  function handleCourseVisibility(courseId){
    setVisibleCourseId(courseId);
  }

  function handleSessionIdInput(sessionId){
    setSessionId(sessionId);
    submitTask(sessionId);
  }

  var html = ""
  if (!response){
    if (!sessionId){
      html = <Fragment>
        <h3>Please Enter Session ID</h3>
        <SessionIdInput onSessionIdSubmit={handleSessionIdInput} />
      </Fragment>;
    }
  }
  else if (response && response.error){
    html = (
      <Fragment>
        <StatusMessage success={false} message={response.error + " " + response.message} status={response.status} />
        <SessionIdInput onSessionIdSubmit={handleSessionIdInput} />
      </Fragment>
      )
  }
  else if (!response.taskCompleted && !response.columns){
    html =  <StatusMessage success={true} message={response.message} status={response.status} />;
  }
  else{
    const columns = response.columns;
    const courseInfoColumns = response.courseInfoColumns;
    const columnsTitles = response.columnsTitles;
    const courseIds = response.courseIds;
    const coursesData = response.coursesData;

    const courseData = coursesData[visibleCourseId];

    html = (
    <Fragment>    
      <div id='course-container'>
        <CoursesNavigation currentCourseId={visibleCourseId} handleCourseVisibility={handleCourseVisibility} courseIds={courseIds} />
        <CourseView
          courseInfoColumns={courseInfoColumns}
          columnsTitles={columnsTitles}
          courseData={courseData}
          columns={columns}
        />
      </div>
      </Fragment>
      );

  }

  const hasResponseData = response !== null && response.data !== null;

  return isAnimationComplete ? 
  (
    <Fragment>
      {/* <NavigationComponent /> */}
      <Header 
        profileData={response ? response.profileData : null} 
        hasResponseData={hasResponseData} 
        onSessionIdSubmit={handleSessionIdInput}
       />
      {html}
    </Fragment>
  ) : 
  (
    <OpeningAnimation />
  );
}



export default App;
