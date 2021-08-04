class Course{
    constructor(crn, name, days, dateStart, dateEnd){
        this.crn = crn;
        this.name = name;
        this.days = days;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    setDay(day){
        this.days = day;
    }
}

export default Course;