//selecting and setting up elements
const form = document.getElementById("guest-form"),
      guestInput = document.getElementById("guest-name"),
      guestCategory = document.getElementById("guest-category"),
      guestList = document.getElementById("guest-list");
//creating the guest storage
let guests = [];


//Adding a submit Event listener
form.addEventListener("submit", (event) => {
    event.preventDefault();

    //Capturing input and validay
    let name = guestInput.value.trim(),
        category = guestCategory.value;
    //Enforcing the limit of the guest
    if (!name) return alert("Enter a name!");
    if (guests.length >= 10) {
        alert("Guest list full! Maximum of 10 guests.");
        return;
    }
    //Adding guest to the array
    guests.push({ name, category, rsvp: false });
    localStorage.setItem("guestList", JSON.stringify(guests));

    //Clearing the input field
    guestInput.value = "";

    //Re-rendering the guest list
    renderGuestList();
});

//Displaying guest in the (UI)
function renderGuestList() { //This function updatesthe list of guests
    guestList.innerHTML = ""; // Clear previous rows before rendering//Adding guest to the array.
    

    //Looping through guest to create items
    guests.forEach((guest, index) => {
        let row = document.createElement("tr"); //Creating a new row of the items

        row.innerHTML = `
            <td>${guest.name}</td> 
            <td>${guest.category}</td>
            <td class="${guest.rsvp ? "attending" : "not-attending"}">
                ${guest.rsvp ? "Attending" : "Not Attending"}
            </td>
            <td>
                <button onclick="toggleRSVP(${index})">Toggle RSVP</button>
                <button onclick="removeGuest(${index})">Remove</button>
            </td>
        `;

        guestList.appendChild(row);
    });
}

function toggleRSVP(index) { //Toggles the RSVP status of a guest at a given index
    guests[index].rsvp = !guests[index].rsvp;//updates the RSVP status of a guest
    localStorage.setItem("guestList", JSON.stringify(guests)); //Saves the updated guest list to localStorage
    renderGuestList();// Re-renders the guest list to reflect the updated RSVP status
}

function removeGuest(index) { // Removes the guest at the given index from the guest list
    guests.splice(index, 1); //This removes the guest from the array
    localStorage.setItem("guestList", JSON.stringify(guests)); //Saves the updated guest list to localStorage
    renderGuestList();// Re-renders the guest list to reflect the removal
}