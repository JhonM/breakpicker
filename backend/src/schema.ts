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
    title: String
    duration: Int
    date: Date
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
  }

  type Mutation {
    createPet(name: String!, age: Int!, pictureUri: String, ownerName: String): Pet!
    updatePet(id: ID!, name: String, age: Int, pictureUri: String, ownerName: String): Pet!
    deletePet(id: ID): ID!
    createEvent(date: Date!): Event!
  }
`);

export default schema;
