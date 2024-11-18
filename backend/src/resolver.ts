import { events, slots } from "./database";
import { randomUUID } from "crypto";

type Event = {
  id: string;
  date: Date;
};

type Slot = {
  id: string;
  mainTitle: string;
  duration: number;
  startDate: Date;
  endDate: Date;
};

const getEvent = (args: { id: string }): Event | undefined => {
  return events.find((event) => event.id === args.id);
};

const getEvents = (): Event[] => {
  return events;
};

const getSlot = (args: { id: string }): Slot | undefined => {
  return slots.find((slot) => slot.id === args.id);
};

const getSlots = (): Slot[] => {
  return slots;
};

const createEvent = (args: { date: Date }): Event => {
  // generate random uuid for pet object
  const generatedId = randomUUID().toString();
  // create event object and save
  const event = { id: generatedId, ...args };
  events.push(event);
  return event;
};

const createSlot = ({
  mainTitle,
  duration,
  startDate,
  endDate,
}: Slot): Slot => {
  // generate random uuid for pet object
  const generatedId = randomUUID().toString();
  // create pet object and save
  const slot = {
    id: generatedId,
    mainTitle,
    duration,
    startDate,
    endDate,
  };
  slots.push(slot);
  return slot;
};

const updateSlot = (args: {
  id: string;
  mainTitle?: string;
  duration?: number;
  startDate?: Date;
  endDate?: Date;
}): Slot => {
  // loop through slots array and get object of slot
  const index = slots.findIndex((slot) => slot.id === args.id);
  const slot = slots[index];

  // update field if it is passed as an argument
  if (args.duration) slot.duration = args.duration;
  if (args.mainTitle) slot.mainTitle = args.mainTitle;
  if (args.startDate) slot.startDate = args.startDate;
  if (args.endDate) slot.endDate = args.endDate;

  console.info(slot, "slot updated");
  return slot;
};

export const root = {
  getEvent,
  getEvents,
  createEvent,
  getSlot,
  getSlots,
  createSlot,
  updateSlot,
};
