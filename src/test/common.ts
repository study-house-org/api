import { faker } from "@faker-js/faker";
import { Response } from "superagent";
import { waitForEvents } from "./queue";

export const API_URL = "http://localhost:6000";

export const endpoint = (path: string) => {
  return `${API_URL}${path}`;
};

export const handleRequest = async (
  request: Promise<Response>
): Promise<Response> => {
  try {
    const response = await request;
    await waitForEvents();
    return response;
  } catch (error: any) {
    error.response.body = JSON.parse(error.response.text);
    console.log(error.response.body);
    return error.response as Response;
  }
};

export const fakePhoneNumber = () => faker.phone.number("+2010########");

export const fakePassword = () =>
  faker.internet.password(20, false, /[A-Z0-9a-z]/);

export const devUserCredentials = {
  username: "ziadalzarka@gmail.com",
  password: fakePassword(),
};
