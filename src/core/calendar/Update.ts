import type { Msgs, Model } from "../../types";

export default function update(msg: Msgs, model: Model): any {
  switch (msg) {
    case "INCREMENT":
      return model;
    case "DECREMENT":
      return model;
  }
}
