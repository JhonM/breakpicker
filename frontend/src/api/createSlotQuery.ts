import { graphql } from "../graphql";
import { fetchData } from "./fetchData";

export const CreateSlotQuery = graphql(`
  mutation CreateSlotQuery(
    $mainTitle: String!
    $duration: Int
    $startDate: Date
    $endDate: Date
  ) {
    createSlot(
      mainTitle: $mainTitle
      duration: $duration
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      mainTitle
      duration
      startDate
      endDate
    }
  }
`);

export const createSlotQuery = async (variables: {
  mainTitle: string;
  duration: number;
  startDate: Date;
  endDate: Date;
}) => {
  try {
    const {
      data: { createSlot },
    } = await fetchData(CreateSlotQuery, variables);

    return { data: createSlot };
  } catch (error) {
    console.error(error);
  }
};
