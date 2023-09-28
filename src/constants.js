// const apiEndpoint = "http://127.0.0.1:5000";
const apiEndpoint = "https://cucourseview-huzaifafarooq412.b4a.run/";

const getTaskDataWaitTime = 2000;

const apiRequestHeaders = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
  };
  
const cookieExpireTimeHours = 60 * 60 * 1000  // 1 Hour

export {apiEndpoint, getTaskDataWaitTime, apiRequestHeaders, cookieExpireTimeHours};
