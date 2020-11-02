"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const csv = require("csv-parser");
const fs = require("fs");
const res = {
    start_date: '',
    end_date: '',
    timetables: []
};
let count = 0;
let current_opening_datetime;
let current_closing_datetime;
let sameday = false;
function concatDateAndTime(date, time) {
    return `${date}T${time}`;
}
fs.createReadStream('src/timetables.csv')
    .pipe(csv())
    .on('data', (row) => {
    if (count === 0)
        res.start_date = row.opening_day;
    const opening_datetime = concatDateAndTime(row.opening_day, row.opening_time);
    const closing_datetime = concatDateAndTime(row.closing_day, row.closing_time);
    // Rule 3
    if (row.opening_time === "NULL" && row.closing_time === "NULL")
        return;
    const openAllday = (row.opening_time === "00:00:00" && row.closing_time === '23:59:59');
    // Rule 2 => push last chunck and current chunck then return
    if (openAllday) {
        res.timetables.push({ opening_datetime: current_opening_datetime, closing_datetime: current_closing_datetime });
        res.timetables.push({ opening_datetime, closing_datetime });
        return;
    }
    if (sameday) {
        // Rule 1
        if (row.opening_time !== "00:00:00") {
            sameday = false;
            // Push last one
            res.timetables.push({ opening_datetime: current_opening_datetime, closing_datetime: current_closing_datetime });
        }
    }
    current_closing_datetime = closing_datetime;
    // If not the same day => currentOpening become the current chunck one
    if (!sameday)
        current_opening_datetime = opening_datetime;
    if (row.closing_time !== '23:59:59') {
        console.log('push!');
        res.timetables.push({ opening_datetime: current_opening_datetime, closing_datetime: current_closing_datetime });
        sameday = false;
    }
    else
        sameday = true;
    count++;
})
    .on('end', () => {
    res.end_date = current_closing_datetime.split('T')[0];
    console.log(res);
    console.log('CSV file successfully processed');
});
