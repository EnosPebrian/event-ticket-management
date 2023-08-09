import { types } from "../types";

const init_state = {
  username: "",
  email: "",
  password: "",
  id: 0,
  points: 0,
  referralcode: "",
  events: [],
};

export const userReducer = (state = init_state, action) => {
  console.log(`di user reducer`, state, action);
  if (action.type === types.login) {
    return {
      ...state,
      username: action.payload.username,
      id: action.payload.id,
      email: action.payload.email,
      password: action.payload.password,
      points: action.payload.points,
      referralcode: action.payload.referralcode,
      events: action.payload.events,
    };
  } else if (action.type === types.logout) {
    return init_state;
  }

  return state;
};
