import { graphql } from "../graphql";
import { fetchData } from "./fetchData";

export const UpdateSlotQuery = graphql(`
  mutation UpdateSlotQuery(
    $id: ID!
    $mainTitle: String!
    $duration: Int!
    $startDate: Date!
    $endDate: Date!
  ) {
    updateSlot(
      id: $id
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

export const updateSlotQuery = async (variables: {
  id: string;
  mainTitle: string;
  duration: number;
  startDate: Date;
  endDate: Date;
}) => {
  try {
    const {
      data: { updateSlot },
    } = await fetchData(UpdateSlotQuery, variables);

    return { data: updateSlot };
  } catch (error) {
    console.error(error);
  }
};
