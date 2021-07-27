class Course{
    constructor(name, days, dateStart, dateEnd){
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