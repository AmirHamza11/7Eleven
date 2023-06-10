import db from "../db.js";
import axios from "axios";
import { response } from "express";
import {
  collection,
  query,
  updateDoc,
  where,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";

const register = async (req, res) => {
  const { email, password, name, address } = req.body;
  // check if user exists
  const q = query(
    collection(db, "ecomm_users"),
    where("email", "==", email),
    where("password", "==", password)
  );

  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    res.status(400);
    throw new Error("User already exists");
  }

  // add a new user to the database

  const docRef = await addDoc(collection(db, "ecomm_users"), {
    email: email,
    password: password,
    name: name,
    address: address,
  });

  await updateDoc(docRef, {
    user_id: docRef.id,
  });
  // return user data
  res.status(200).json({
    status: "success",
    data: { user_id: docRef.id, name, email, address },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //check if user exists
  const q = query(
    collection(db, "ecomm_users"),
    where("email", "==", email),
    where("password", "==", password)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    res.status(402).json({ message: "User does not exist" });
  }

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    res.status(200).json({
      status: "success",
      data: {
        user_id: data.user_id,
        name: data.name,
        email: data.email,
        address: data.address,
      },
    });
  });

  // return user data
  res.json({ message: "login" });
};

const updateUser = async (req, res) => {
  try {
    const { account_id, pin_code } = req.body;
    const user_id = req.params.id;
    axios
      .post("http://localhost:5000/api/v1/auth/login", {
        account_id: account_id,
        pin_code: pin_code,
      })
      .then(async (response) => {
        console.log(response.data);
        await updateDoc(doc(db, "ecomm_users", user_id), {
          account_id: account_id,
          pin_code: pin_code,
        });

        res.status(200).json({ status: "success", message: "user updated" });
      })
      .catch((error) => {
        console.log(error.response.status);
        res.json({ status: "failed", message: error.response.data.message });
      });
  } catch (e) {}
};

export { register, login, updateUser };
