import {
  getCurrentMonthName,
  getCurrentYear,
  getMonth,
  getYear,
} from "../../helpers/dates";
// import { guid } from "../../helpers/random";
import type { EventType, Model } from "../../types";

const today = new Date();

// function addDaysToDate(date: Date, days: number) {
//   let new_date = new Date(date);
//   new_date.setDate(new_date.getDate() + days);
//   return new_date;
// }

const initModel: Model = {
  month: getMonth(today),
  year: getYear(today),
  currentMonth: getCurrentMonthName,
  currentYear: getCurrentYear,
  currentDate: new Date(),
  currentMonthDays: null,
  showForm: false,
  editMode: false,
  nextId: 2,
  editId: null,
  eventId: null,
  currentSlotId: null,
  events: [
    // {
    //   id: guid(),
    //   date: addDaysToDate(today, 3),
    //   slots: [
    //     {
    //       id: guid(),
    //       mainTitle: "slot mainTitle",
    //       duration: 4,
    //       startDate: new Date(),
    //       endDate: new Date(),
    //     },
    //     {
    //       id: guid(),
    //       mainTitle: "slot mainTitle two",
    //       duration: 3,
    //       startDate: new Date(),
    //       endDate: new Date(),
    //     },
    //     {
    //       id: guid(),
    //       mainTitle: "slot mainTitle three",
    //       duration: 1,
    //       startDate: new Date(),
    //       endDate: new Date(),
    //     },
    //   ],
    // },
    // {
    //   id: guid(),
    //   date: addDaysToDate(today, 7),
    //   slots: [
    //     {
    //       id: guid(),
    //       mainTitle: "slot two mainTitle",
    //       duration: 4,
    //       startDate: new Date(),
    //       endDate: new Date(),
    //     },
    //     {
    //       id: guid(),
    //       mainTitle: "slot two mainTitle two",
    //       duration: 3,
    //       startDate: new Date(),
    //       endDate: new Date(),
    //     },
    //     {
    //       id: guid(),
    //       mainTitle: "slot two mainTitle three",
    //       duration: 1,
    //       startDate: new Date(),
    //       endDate: new Date(),
    //     },
    //   ],
    // },
  ] as EventType[],
};

export default initModel;
