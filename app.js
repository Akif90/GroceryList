import {initializeApp} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://shopping-c9e24-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const itemInDB = ref(database, "items");

const inputField = document.getElementById("inputField");
const button = document.getElementById("btn");
const shopping = document.getElementById("shopping");

const clearField = (text) => {
  text.value = "";
};

const addList = (input) => {
  const itemID = input[0];
  const itemValue = input[1];
  // shopping.innerHTML += `<li>${input}</li>`;
  const newLi = document.createElement("li");
  const textNode = document.createTextNode(itemValue);
  // we could have also used textContent func to write text into the li

  newLi.addEventListener("dblclick", () => {
    const itemLocation = ref(database, `items/${itemID}`);
    remove(itemLocation);
  });
  newLi.append(textNode);
  shopping.append(newLi);
};

const onBtnClick = () => {
  //push function is used to update the db, first arg is for the ref i.e where
  //  the data needs to be stored and the 2nd arg is the data which needs to be
  // stored.
  push(itemInDB, inputField.value);

  //now creating an li and adding it to the list with textField set to inputField.val
  //another way is to create a new node and change the html value by accessing
  //inner HTML.

  clearField(inputField);
};
button.addEventListener("click", onBtnClick);

const clearList = () => {
  shopping.innerHTML = "";
};
onValue(itemInDB, (snap) => {
  clearList();
  if (snap.exists()) {
    const itemsList = Object.entries(snap.val());

    itemsList.forEach((el) => {
      addList(el);
    });
  } else {
    shopping.innerHTML = "No items added yet...";
  }
});
