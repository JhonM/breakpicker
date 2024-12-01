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

interface UpdateSlotResponse {
  data: {
    updateSlot: {
      id: string;
      mainTitle: string;
      duration: number;
      startDate: string;
      endDate: string;
    };
  };
}

export const updateSlotQuery = async (variables: {
  id: string;
  mainTitle: string;
  duration: number;
  startDate: Date;
  endDate: Date;
}) => {
  try {
    const response = await fetchData<UpdateSlotResponse>(
      UpdateSlotQuery,
      variables
    );
    console.info(response, "response update slot");
    return { data: response.data.updateSlot };
  } catch (error) {
    console.error(error);
  }
};
