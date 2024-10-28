import { graphql } from "../graphql";
import { fetchData } from "./fetchData";

const CreateSlotQuery = graphql(`
  mutation CreateSlotQuery(
    $mainTitle: String!
    $duration: Int
    $startDate: Date
    $endDate: Date
  ) {
    createSlot(
      title: $mainTitle
      duration: $duration
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      title
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
    const data = await fetchData(CreateSlotQuery, variables);
    return data;
  } catch (error) {
    console.error(error);
  }
};
