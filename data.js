import Course from "./Course.js";

// Dictionary for extractDaysOfWeek
let dict = {
  "M" : "Monday",
  "T" : "Tuesday",
  "W" : "Wednesday",
  "R" : "Thursday",
  "F" : "Friday",
  "S" : "Saturday",
  "MWF": "Monday Wednesday Friday",
  "MW": "Monday Wednesday",
  "TR": "Tuesday Thursday",
};

// Data from web scraping
let result = [
    {
      select: 'NR',
      crn: '20006',
      subj: 'RHET',
      crse: '103',
      sec: '01',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '08:00 am-09:45 am',
      cap: '22',
      act: '14',
      rem: '8',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Brian S  Vannice (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20007',
      subj: 'RHET',
      crse: '103',
      sec: '02',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MWF',
      time: '10:30 am-11:35 am',
      cap: '22',
      act: '21',
      rem: '1',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Ben David  Linzer (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20008',
      subj: 'RHET',
      crse: '103',
      sec: '03',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MWF',
      time: '08:00 am-09:05 am',
      cap: '22',
      act: '21',
      rem: '1',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Kathleen Anne  Arnolfo (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20009',
      subj: 'RHET',
      crse: '103',
      sec: '04',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '09:55 am-11:40 am',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Devon C  Holmes (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20010',
      subj: 'RHET',
      crse: '103',
      sec: '05',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MWF',
      time: '10:30 am-11:35 am',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Leigh Taylor  Meredith (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20011',
      subj: 'RHET',
      crse: '103',
      sec: '06',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MWF',
      time: '02:15 pm-03:20 pm',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Leigh Taylor  Meredith (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20012',
      subj: 'RHET',
      crse: '103',
      sec: '07',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '04:35 pm-06:20 pm',
      cap: '22',
      act: '16',
      rem: '6',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Angela Ehle  Beasley (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20013',
      subj: 'RHET',
      crse: '103',
      sec: '09',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '02:40 pm-04:25 pm',
      cap: '22',
      act: '18',
      rem: '4',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Brian S  Vannice (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20014',
      subj: 'RHET',
      crse: '103',
      sec: '10',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MWF',
      time: '11:45 am-12:50 pm',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'John B  Ryan (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20017',
      subj: 'RHET',
      crse: '103',
      sec: '13',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MWF',
      time: '09:15 am-10:20 am',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Marc   Martin (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20018',
      subj: 'RHET',
      crse: '103',
      sec: '14',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MW',
      time: '06:30 pm-08:15 pm',
      cap: '22',
      act: '21',
      rem: '1',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Michael A  Rozendal (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20019',
      subj: 'RHET',
      crse: '103',
      sec: '15',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MWF',
      time: '01:00 pm-02:05 pm',
      cap: '22',
      act: '15',
      rem: '7',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Kathleen Anne  Arnolfo (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20020',
      subj: 'RHET',
      crse: '103',
      sec: '16',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '06:30 pm-08:15 pm',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Erik W  Christianson (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20021',
      subj: 'RHET',
      crse: '103',
      sec: '17',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MW',
      time: '04:45 pm-06:25 pm',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Joanne W  Babin (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20023',
      subj: 'RHET',
      crse: '103',
      sec: '19',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'MWF',
      time: '11:45 am-12:50 pm',
      cap: '22',
      act: '20',
      rem: '2',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Erik W  Christianson (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20025',
      subj: 'RHET',
      crse: '103',
      sec: '21',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '12:45 pm-02:30 pm',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Devon C  Holmes (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '20027',
      subj: 'RHET',
      crse: '103',
      sec: '23',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '12:45 pm-02:30 pm',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Nicole Gonzales  Howell (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20029',
      subj: 'RHET',
      crse: '103',
      sec: '25',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '08:00 am-09:45 am',
      cap: '22',
      act: '18',
      rem: '4',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'David C  Ryan (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'C',
      crn: '21985',
      subj: 'RHET',
      crse: '103',
      sec: '26',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Speaking',
      days: 'TR',
      time: '09:55 am-11:40 am',
      cap: '22',
      act: '22',
      rem: '0',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Michelle R  LaVigne (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20030',
      subj: 'RHET',
      crse: '104',
      sec: '01',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Argumentation and Debate',
      days: 'MWF',
      time: '01:00 pm-02:05 pm',
      cap: '12',
      act: '9',
      rem: '3',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Robert   Boller (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '20044',
      subj: 'RHET',
      crse: '111',
      sec: '01',
      cmp: 'ODP',
      cred: '4.000',
      title: 'Public Spkng/Health Profession',
      days: 'MWF',
      time: '09:15 am-10:20 am',
      cap: '22',
      act: '21',
      rem: '1',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Bryan Burton  Whaley (P)',
      date: '01/25-05/13',
      location: 'RMT ',
      attribute: 'Core A1 Public Speaking'
    },
    {
      select: 'NR',
      crn: '21009', // this 
      subj: 'SII', // this 
      crse: '325', // this 
      sec: '01', // this 
      cmp: 'ODP', 
      cred: '2.000', // this 
      title: 'SYM: Public Speaking', // this 
      days: 'M', // We can assume this for now on 1 day.
      time: '01:00 pm-02:35 pm', //IMPORTANT
      cap: '14', 
      act: '10',
      rem: '4',
      wlCap: '0',
      wlAct: '0',
      wlRem: '0',
      xlCap: '0',
      xlAct: '0',
      xlRem: '0',
      instructor: 'Michelle R  LaVigne (P)', // this
      date: '01/25-05/13', // this
      location: 'RMT ', 
      attribute: 'Core A1 Public Speaking' // This 
    }
];

const time = '11:30 pm-02:35 pm';

// Credit: https://stackoverflow.com/questions/15083548/convert-12-hour-hhmm-am-pm-to-24-hour-hhmm
function convertTime12to24(time12h){
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
}

// Create new date based on the object (course).
// tag start = starting date and time 
// tag end   = eding date and time 
function createNewDate(tag, object){
  
  // Format time to correct format (12 to 24 time)
  function formatTime(time){
    return `${convertTime12to24(time.split('-')[0])}-${convertTime12to24(time.split('-')[1])}`;
  }
  
  // Extract hour based on tag `start` and `end` given formatted time.
  function extractHour(tag, time){
    return tag === 'start' 
           ? parseInt(time.split('-')[0].split(':')[0])
           : parseInt(time.split('-')[1].split(':')[0]);
  }

  // Extract minute based on tag `start` and `end` given formatted time.
  function extractMinute(tag, time){
    return tag === 'start' 
           ? parseInt(time.split('-')[0].split(':')[1])
           : parseInt(time.split('-')[1].split(':')[1]);
  }

  // Extract month based on tag `start` and `end` given formatted time.
  function extractMonth(tag, date){
    return tag === 'start' 
           ? parseInt(date.split('-')[0].split('/')[0])
           : parseInt(date.split('-')[0].split('/')[0]);
  }

  // Extract day based on tag `start` and `end` given formatted time.
  function extractDay(tag, time){
    return tag === 'start' 
           ? parseInt(time.split('-')[0].split('/')[1])
           : parseInt(time.split('-')[0].split('/')[1]);
  }
  
  // Initialize time and date
  let timeX = formatTime(object.time);
  let date = object.date;
  
  return tag === 'start'
         ? new Date(2021, extractMonth('start', date), extractDay('start', date), extractHour('start', timeX), extractMinute('start', timeX))
         : new Date(2021, extractMonth('end', date), extractDay('end', date), extractHour('end', timeX), extractMinute('end', timeX));
}

// Return days of week from object days code using `dict`
// MWF -> Monday Wednesday Friday
function extractDaysOfWeek(object){
  return dict[object.days]
}

// Create new course array using all objects from database
function newCourseArray(objectArray){
  let arr = [];
  for(let i = 0; i< objectArray.length; i++){
    arr.push(new Course(objectArray[i].title, extractDaysOfWeek(objectArray[i]), createNewDate('start', objectArray[i]), createNewDate('end', objectArray[i])));
  }
  return arr;
}


let courseArray = newCourseArray(result);

// export courseArray to other files
export default courseArray;

