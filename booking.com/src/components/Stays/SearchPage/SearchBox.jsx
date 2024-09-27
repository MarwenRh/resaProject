import {useState} from "react"
import styles from "./SearchBox.module.css"
import Calendar from "react-calendar"


export const SearchBox = ({filterSearch, data}) => {
    let dest = "";
    let startDates = [];
    let endDates = [];
    let adultsT = 2;
    let childrenT = 0;
    let roomsT = 2;
    const [startValue, onStartValueChange] = useState(new Date());
    const [endValue, onEndChange] = useState(new Date());
    const [startDate, setStartDate] = useState(false)
    const [endDate, setEndDate] = useState(false)
    if(data === undefined){
        dest = ""
        startDates = [startValue.getDay(), startValue.getMonth(), startValue.getDate()]
        endDates = [endValue.getDay(), endValue.getMonth(), endValue.getDate()]
    }else{
        dest = data.query
        startDates = [data.currentMonth, data.currentDay, data.currentDayNum]
        endDates = [data.endMonth, data.endDay, data.endDayNum]
        adultsT = data.adults;
        childrenT = data.children;
        roomsT = data.rooms;
    }
    const [destination, setDestination] = useState(dest)
    const [currentMonth, currentDay, currentDayNum] = endDatePicker(...startDates)
    const [endMonth, endDay, endDayNum] = endDatePicker(...endDates)

    const [adults, setAdults] = useState(adultsT)
    const [children, setChildren] = useState(childrenT)
    const [rooms, setRooms] = useState(roomsT)

    const [adult, setAdult] = useState(false)
    const [child, setChild] = useState(false)
    const [room, setRoom] = useState(false)

    const handleInitDate = () => {
        setStartDate(!startDate)
        setEndDate(false)
    }
    const handleEndDate = () => {
        setStartDate(false)
        setEndDate(!endDate)
    }

    const handleAdults = (v) => {
        setAdults((prev) => {
            let x = prev + v;
            if (x < 1) {
                return 1
            } else {
                return x
            }
        })
    }
    const handleChildren = (v) => {
        setChildren((prev) => {
            let x = prev + v;
            if (x < 0) {
                return 0
            } else {
                return x
            }
        })
    }
    const handleRooms = (v) => {

        setRooms((prev) => {
            let x = prev + v;
            if (x < 1) {
                return 1
            } else {
                return x
            }
        })
    }
    const handleAdult = () => {
        setAdult(!adult)
        setChild(false)
        setRoom(false)
    }
    const handleChild = () => {
        setAdult(false)
        setChild(!child)
        setRoom(false)
    }
    const handleRoom = () => {
        setAdult(false)
        setChild(false)
        setRoom(!room)
    }

    const handleSearch = () => {
        filterSearch(destination)
        setDestination("")
        setAdults(1)
        setChildren(0)
        setRooms(1)

    }


    return ( <div className={styles.SearchRequestContainer}>
    <p>Search</p>
    <div className={styles.destination}>
        <p>Destination/property name:</p>
        <div>
            <svg aria-hidden="true" fill="#838181" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 24 24">
                <path d="M17.464 6.56a8.313 8.313 0 1 1-15.302 6.504A8.313 8.313 0 0 1 17.464 6.56zm1.38-.586C16.724.986 10.963-1.339 5.974.781.988 2.9-1.337 8.662.783 13.65c2.12 4.987 7.881 7.312 12.87 5.192 4.987-2.12 7.312-7.881 5.192-12.87zM15.691 16.75l7.029 7.03a.75.75 0 0 0 1.06-1.06l-7.029-7.03a.75.75 0 0 0-1.06 1.06z"></path>
            </svg>
            <input type="text" placeholder="Search Your Destination City" onChange={(e) => setDestination(e.target.value)} value={destination} />
        </div>
    </div>
    <div className={styles.dateInput}>
        <p>Check-in date</p>
        <div>
            <svg aria-hidden="true" fill="#838181" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 24 24">
                <path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path>
            </svg>
            <input type="text" placeholder="Mon 30 Aug" onClick={handleInitDate} value={startValue.toDateString()} readOnly />
            <svg aria-hidden="true" fill="#838181" focusable="false" height="18" role="presentation" width="18" viewBox="0 0 24 24">
                <path d="M18 9.45c0 .2-.078.39-.22.53l-5 5a1.08 1.08 0 0 1-.78.32 1.1 1.1 0 0 1-.78-.32l-5-5a.75.75 0 0 1 0-1.06.74.74 0 0 1 1.06 0L12 13.64l4.72-4.72a.74.74 0 0 1 1.06 0 .73.73 0 0 1 .22.53zm-5.72 4.47zm-.57 0z"></path>
            </svg>
        </div>
    </div>
    <div className={styles.dateInput}>
        <p>Check-out date</p>
        <div>
            <svg aria-hidden="true" fill="#838181" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 24 24">
                <path d="M22.502 13.5v8.25a.75.75 0 0 1-.75.75h-19.5a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.752 3h-19.5a2.25 2.25 0 0 0-2.25 2.25v16.5A2.25 2.25 0 0 0 2.252 24h19.5a2.25 2.25 0 0 0 2.25-2.25V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.752a.75.75 0 0 0 0 1.5zM7.502 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zm10.5 0V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0z"></path>
            </svg>
            <input type="text" placeholder="Mon 30 Aug 2021" onClick={handleEndDate} value={endValue.toDateString()} readOnly />
            <svg aria-hidden="true" fill="#838181" focusable="false" height="18" role="presentation" width="18" viewBox="0 0 24 24">
                <path d="M18 9.45c0 .2-.078.39-.22.53l-5 5a1.08 1.08 0 0 1-.78.32 1.1 1.1 0 0 1-.78-.32l-5-5a.75.75 0 0 1 0-1.06.74.74 0 0 1 1.06 0L12 13.64l4.72-4.72a.74.74 0 0 1 1.06 0 .73.73 0 0 1 .22.53zm-5.72 4.47zm-.57 0z"></path>
            </svg>
        </div>
    </div>
    <div className={styles.dateInput}>
        <p>1 adult - 0 children - 1 room</p>
        <div>
            <svg aria-hidden="true" fill="#838181" focusable="false" height="20" role="presentation" width="20" viewBox="0 0 24 24">
                <path d="M12 5.25a.75.75 0 0 0 .75-.75V3a2.25 2.25 0 1 0-4.5 0v1.5a.75.75 0 0 0 .75.75H12zm0 1.5H9.75a2.25 2.25 0 0 0-2.25 2.25v1.5a.75.75 0 0 0 .75.75H14a.75.75 0 0 0 .75-.75v-1.5a2.25 2.25 0 0 0-2.25-2.25H12zM6 10.5v-1.5A3.75 3.75 0 0 1 9.75 5.25h.75V3A3.75 3.75 0 1 1 18 3v1.5h.75A3.75 3.75 0 0 1 22.5 8.25v1.5H6zM3 13.5h18v6.75a.75.75 0 0 1-.75.75H3.75a.75.75 0 0 1-.75-.75V13.5zm0 1.5v5.25h16.5V15h-16.5zm3 2.25a.75.75 0 1 0 0 1.5h12a.75.75 0 0 0 0-1.5H6z"></path>
            </svg>
            <input type="text" placeholder="1 adult - 0 children - 1 room" onClick={handleAdult} value={`${adults} adult - ${children} children - ${rooms} room`} readOnly />
            <svg aria-hidden="true" fill="#838181" focusable="false" height="18" role="presentation" width="18" viewBox="0 0 24 24">
                <path d="M18 9.45c0 .2-.078.39-.22.53l-5 5a1.08 1.08 0 0 1-.78.32 1.1 1.1 0 0 1-.78-.32l-5-5a.75.75 0 0 1 0-1.06.74.74 0 0 1 1.06 0L12 13.64l4.72-4.72a.74.74 0 0 1 1.06 0 .73.73 0 0 1 .22.53zm-5.72 4.47zm-.57 0z"></path>
            </svg>
        </div>
    </div>
    <button className={styles.searchButton} onClick={handleSearch}>Search</button>
</div>)
    

}

function endDatePicker(D, M, day) {
    var month = [];
    for (let i = 0; i < 12; i++) {
        month.push(0)
    }
    month[0] = "Jan";
    month[1] = "Feb";
    month[2] = "March";
    month[3] = "Apr";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "Aug";
    month[8] = "Sept";
    month[9] = "Oct";
    month[10] = "Nov";
    month[11] = "Dec";

    var weekday = [];
    for (let i = 0; i < 7; i++) {
        weekday.push(0)
    }
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thur";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    var currentDay = weekday[D];

    var currentMonth = month[M];
    console.log("CCC", D, M, day)
    return [currentMonth, currentDay, day]
}