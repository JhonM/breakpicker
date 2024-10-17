import initModel from "./core/calendar/Model";
import update from "./core/calendar/Update";
import view from "./core/calendar/View";
import app from "./core/calendar/App";

const appContainer = document.getElementById("app");
app(initModel, update, view, appContainer);
