import { pets, events } from "./database";
import { randomUUID } from "crypto";

type Pet = {
  id: string;
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
};

type Event = {
  id: string;
  date: Date;
};

const getPet = (args: { id: string }): Pet | undefined => {
  return pets.find((pet) => pet.id === args.id);
};

const getPets = (): Pet[] => {
  return pets;
};

const getEvent = (args: { id: string }): Event | undefined => {
  return events.find((event) => event.id === args.id);
};

const getEvents = (): Event[] => {
  return events;
};

const createPet = (args: {
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
}): Pet => {
  // generate randon uuid for pet object
  const generatedId = randomUUID().toString();
  // create pet object and save
  const pet = { id: generatedId, ...args };
  pets.push(pet);
  return pet;
};

const createEvent = (args: { date: Date }): Event => {
  // generate randon uuid for pet object
  const generatedId = randomUUID().toString();
  // create pet object and save
  const event = { id: generatedId, ...args };
  events.push(event);
  return event;
};

const updatePet = (args: {
  id: string;
  name?: string;
  age?: number;
  pictureUri?: string;
  ownerName?: string;
}): Pet => {
  // loop through pets array and get object of pet
  const index = pets.findIndex((pet) => pet.id === args.id);
  const pet = pets[index];

  // update field if it is passed as an argument
  if (args.age) pet.age = args.age;
  if (args.name) pet.name = args.name;
  if (args.pictureUri) pet.pictureUri = args.pictureUri;

  return pet;
};

const deletePet = (args: { id: string }): string => {
  // loop through pets array and delete pet with id
  const index = pets.findIndex((pet) => pet.id === args.id);
  if (index !== -1) {
    pets.splice(index, 1);
  }

  return args.id;
};

export const root = {
  getPet,
  getPets,
  createPet,
  updatePet,
  deletePet,
  getEvent,
  getEvents,
  createEvent,
};
