type Msgs = "INCREMENT" | "DECREMENT";

export default function update(msg: Msgs, model: number): number {
  switch (msg) {
    case "INCREMENT":
      return model + 1;
    case "DECREMENT":
      return model - 1;
  }
}
