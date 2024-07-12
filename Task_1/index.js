let myData = [];

// Buttons 
const AddItemBtn = document.getElementById("addItem");
const SortItemBtn = document.getElementById("sortItem");

// Input fields
const myID = document.getElementById("idInput");
const key = document.getElementById("key");
const myVal = document.getElementById("valInput");

// Table Body 
const tableBody = document.getElementById("TableBody");

// Utility function to bind event listeners to the edit button
const EditBtnEventBinder = (btn, keyCell, valueCell) => {

    btn.addEventListener("click", () => {
        // If use press edit we change td to input fileds
        if (btn.textContent === "Edit") {
            btn.textContent = "Save";
            keyCell.innerHTML = "<input type='text'>";
            valueCell.innerHTML = "<input type='text'>";
        }
        // If use press save we update the data in our array and update the table
        else {
            btn.textContent = "Edit";
            const index = parseInt(btn.id);
            const keyVal = keyCell.querySelector("input").value
            const valueVal = valueCell.querySelector("input").value

            //  updating Array
            myData.map((data) => {
                if (data.id == index) {
                    data.key = keyVal;
                    data.value = valueVal;
                }
            })

            // Updating Table 
            keyCell.innerHTML = `<td>${keyVal}</td>`
            valueCell.innerHTML = `<td>${valueVal}</td>`
        }
    });
}

// Utility function to bind event listeners to the delete button
const DeleteBtnEventBinder = (btn) => {
    btn.addEventListener("click", () => {
        const index = parseInt(btn.id);
        // removing the item from the array
        myData = myData.filter((item) => item.id!= index);
        btn.parentElement.parentElement.remove();
    });
}

// Utility function to create a new table row
const createElement = (item) => {
    // created a new Row 
    let row = document.createElement("tr");
    // created new cells
    let idCell = document.createElement("td");
    let keyCell = document.createElement("td");
    let valueCell = document.createElement("td");
    let buttonCell = document.createElement("td");

    // giving them classnames according to my frontend design
    row.classList.add("TableData");

    // creating the edit/delete buttons
    const editBtn = document.createElement("button");
    const delBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    delBtn.textContent = "Delete";
    // giving them classnames and ids
    editBtn.classList.add("edit-btn");
    delBtn.classList.add("delete-btn");
    editBtn.id = `${item.id}`;
    delBtn.id = `${item.id}`;

    // Binding event listeners to the buttons
    EditBtnEventBinder(editBtn, keyCell, valueCell);
    DeleteBtnEventBinder(delBtn);

    // setting the textContent of the cells
    idCell.textContent = item.id;
    keyCell.textContent = item.key;
    valueCell.textContent = item.value;

    // appending all of them in the Row
    buttonCell.appendChild(editBtn);
    buttonCell.appendChild(delBtn);
    row.appendChild(idCell);
    row.appendChild(keyCell);
    row.appendChild(valueCell);
    row.appendChild(buttonCell);

    return row;
}

// This function will get the data from the array and display it in the table
const displayData = () => {
    tableBody.innerHTML = "";

    myData.forEach((item) => {

        // calling a function to create a new row
        const row = createElement(item);

        tableBody.appendChild(row);

    })
}

// This function will run when the user will add a new item
AddItemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // Checking if all fields are filled
    if(!myID.value ||!key.value.trim() ||!myVal.value.trim()) {
        alert("All fields are required!");
        return;
    }

    // checking for duplicate ids
    const isDuplicatePresent=myData.some(item=>item.id===myID.value);

    if(isDuplicatePresent)
    {
        alert("Duplicate ID is not allowed");
        return;
    }

    
    // Added item in the Array
    const obj = { id: myID.value, key: key.value, value: myVal.value };
    myData.push(obj);

    // Added item in the Table
    displayData();

    // clearing all the inputs
    myID.value="";
    myVal.value="";
    key.value="";

})

// This function will sort the items on the basis of ID
SortItemBtn.addEventListener("click",(e)=>{
    if(myData.length===0)
    {
        alert("Please add some items first")
        return;
    }
    // We will sort in the ascending order
   myData= myData.sort((a,b)=>(a.id-b.id));
   displayData();
})