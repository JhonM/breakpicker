const pets: {
  id: string;
  name: string;
  age: number;
  pictureUri: string;
  ownerName: string;
}[] = [];

const events: {
  id: string;
  date: Date;
}[] = [];

const slots: {
  id: string;
  title: string;
  duration: number;
  startDate: Date;
  endDate: Date;
}[] = [];

export { pets, events, slots };
