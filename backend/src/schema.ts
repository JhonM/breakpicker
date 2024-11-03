import { buildSchema } from "graphql";

const schema = buildSchema(`
  scalar Date

  type Pet {
    id: ID
    name: String
    age: Int 
    pictureUri: String
    ownerName: String
  }

  type Slot {
    id: ID
    mainTitle: String
    duration: Int
    startDate: Date
    endDate: Date
  }

  type Event {
    id: ID
    date: Date
    slots: [Slot]
  }

  type Query {
    getPets: [Pet]
    getPet(id: ID!): Pet
    getEvents: [Event]
    getEvent(id: ID): Event
    getSlot(id: ID): Slot
  }

  type Mutation {
    createPet(name: String!, age: Int!, pictureUri: String, ownerName: String): Pet!
    updatePet(id: ID!, name: String, age: Int, pictureUri: String, ownerName: String): Pet!
    deletePet(id: ID): ID!
    createEvent(date: Date!): Event!
    createSlot(mainTitle: String!, duration: Int, startDate: Date, endDate: Date): Slot!
  }
`);

export default schema;
