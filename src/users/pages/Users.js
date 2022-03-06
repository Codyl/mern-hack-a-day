import React from "react";
import UsersList from "../components/UsersList";

export const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "ben shallus",
      image:
        "https://image.shutterstock.com/image-photo/closeup-portrait-smiling-half-naked-600w-1356965294.jpg",
      places: 3,
    },
  ];
  return <UsersList items={USERS} />;
};
