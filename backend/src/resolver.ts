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

const getSlots = (args: { eventId: string }): Slot[] => {
  // do an find in particular event.
  return slots;
};

const createEvent = (args: { date: Date }): Event => {
  // generate randon uuid for pet object
  const generatedId = randomUUID().toString();
  // create pet object and save
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
  // generate randon uuid for pet object
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

export const root = {
  getEvent,
  getEvents,
  createEvent,
  getSlot,
  getSlots,
  createSlot,
};
