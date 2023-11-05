import logo from './logo.svg';
import React, { useState, useEffect, useRef, Fragment } from "react";
import Cookies from 'js-cookie';

import './App.css';
import './assets/css/overlay.css';

import CourseView from './components/CourseView';
import Header from './components/Header';
import CoursesNavigation from './components/CourseNavigation';
import StatusMessage from './components/StatusMessage';
import SessionIdInput from "./components/SessionIdInput";
import OpeningAnimation from "./components/OpeningAnimation";
import NavigationComponent from "./components/NavigationComponent";
import ScoreRadarChart from './components/ScoreRadarChart';
import Preloader from './components/Preloader';


import { apiEndpoint, apiRequestHeaders, cookieExpireTimeHours, getTaskDataWaitTime } from './constants'


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

    fetch(apiEndpoint + '/taskdata/' + sessionId + "?" + params, {
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
        } , getTaskDataWaitTime);
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
      setResponse({
        message: "Failed to send send request to API.",
        error: error,
        status: "Failed"
      });
    });
  }

  function displayDemo(){
    fetch(apiEndpoint + '/demo' , {
        method: 'GET',
        headers : apiRequestHeaders,
    })
    .then(response => response.json())
    .then(response => {
        setResponse(response.data);
        setVisibleCourseId(response.data.courseIds[0]);
    }
    )
    .catch(error => {
      setResponse({
        message: "Failed to send send request to API.",
        error: error,
        status: "Failed"
      });
    });
  }

  function submitTask(sessionId){
    fetch(apiEndpoint + '/task/' , {
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
        message: "Failed to send send request to API.",
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
  if (!response && !sessionId){
      html = <Fragment>
        <h3>Please Enter Session ID</h3>
        <SessionIdInput onSessionIdSubmit={handleSessionIdInput} />
      </Fragment>;
  }
  else if (!response && sessionId){
    html = <Preloader />;
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

    const currentCourseData = coursesData[visibleCourseId];

    const chartData = [];
    for (const [course, scoreData] of Object.entries(coursesData)){
        chartData.push({
            name: `${course} (${scoreData.overview.percentage}%)`,
            value: scoreData.overview.percentage,
            fullMark: 100
    });
  }

    html = (
    <Fragment>    
      <div id='course-container'>
        <CoursesNavigation currentCourseId={visibleCourseId} handleCourseVisibility={handleCourseVisibility} courseIds={courseIds} />
        <CourseView
          courseInfoColumns={courseInfoColumns}
          columnsTitles={columnsTitles}
          courseData={currentCourseData}
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
        displayDemo={displayDemo}
       />
      {html}
    </Fragment>
  ) : 
  (
    <OpeningAnimation />
  );
}



export default App;
