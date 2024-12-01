import { graphql } from "../graphql";
import { fetchData } from "./fetchData";

export const CreateEventQuery = graphql(`
  mutation CreateEventQuery($date: Date!) {
    createEvent(date: $date) {
      id
      date
    }
  }
`);

export const createEventQuery = async (variables: { date: Date }) => {
  try {
    const {
      data: { createEvent },
    } = await fetchData(CreateEventQuery, variables);

    return { data: createEvent };
  } catch (error) {
    console.error(error);
  }
};
