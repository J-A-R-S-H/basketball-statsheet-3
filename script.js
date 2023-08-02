let playerData = [
    { name: "Samuel", points: 2, assists: 1, steals: 5, fga: 19, twoPm: 0, threePm: 1, rebounds: 9, blocks: 0, turnovers: 6, shotPercentage: 5 },
    { name: "Andrew", points: 17, assists: 5, steals: 3, fga: 29, twoPm: 10 - 4, threePm: 4, rebounds: 6, blocks: 4, turnovers: 3, shotPercentage: 34.40 },
    { name: "Linus", points: 6, assists: 4, steals: 6, fga: 21, twoPm: 4 - 2, threePm: 2, rebounds: 4, blocks: 0, turnovers: 6, shotPercentage: 14.40 },
    { name: "Martino", points: 5, assists: 1, steals: 2, fga: 17, twoPm: 3 - 1, threePm: 1, rebounds: 7, blocks: 0, turnovers: 11, shotPercentage: 20 },
    { name: "Ben", points: 11, assists: 6, steals: 7, fga: 38, twoPm: 11, threePm: 0, rebounds: 50, blocks: 1, turnovers: 4, shotPercentage: 28.90 },
    { name: "Vince", points: 7, assists: 1, steals: 4, fga: 22, twoPm: 4 - 1, threePm: 1, rebounds: 19, blocks: 0, turnovers: 3, shotPercentage: 18.10 },
    { name: "Lance", points: 6, assists: 0, steals: 1, fga: 21, twoPm: 6, threePm: 0, rebounds: 10, blocks: 1, turnovers: 4, shotPercentage: 10.35 },
    { name: "Kyle", points: 0, assists: 5, steals: 8, fga: 14, twoPm: 0, threePm: 0, rebounds: 11, blocks: 0, turnovers: 5, shotPercentage: 0 },
    { name: "Jeremy", points: 5, assists: 3, steals: 1, fga: 38, twoPm: 4 - 1, threePm: 1, rebounds: 14, blocks: 2, turnovers: 12, shotPercentage: 10.50 },
    { name: "John", points: 2, assists: 0, steals: 0, fga: 5, twoPm: 2, threePm: 0, rebounds: 2, blocks: 0, turnovers: 3, shotPercentage: 40 },
    { name: "Ethan", points: 1, assists: 0, steals: 0, fga: 6, twoPm: 1, threePm: 0, rebounds: 6, blocks: 1, turnovers: 4, shotPercentage: 16.60 }
];

let playerColors = new Map(); // Store player colors separately

function populateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = "";

    // Iterate through the player data and populate the table
    playerData.forEach((player, index) => {
        const row = document.createElement("tr");

        const color = playerColors.get(player.name);
        if (color) {
            row.className = color;
        } else {
            row.className = index < 5 ? "team-1" : "team-2";
            // Store the assigned color for the player
            playerColors.set(player.name, row.className);
        }

        row.innerHTML = `
        <td>${player.name}</td>
        <td>${player.points}</td>
        <td>${player.assists}</td>
        <td>${player.steals}</td>
        <td>${player.fga}</td>
        <td>${player.twoPm}</td>
        <td>${player.threePm}</td>
        <td>${player.rebounds}</td>
        <td>${player.blocks}</td>
        <td>${player.turnovers}</td>
        <td>${player.shotPercentage}</td>
      `;
        tableBody.appendChild(row);
    });
}

// Function to update the table with sorted data
function updateTable() {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; // Clear the table body

    // Iterate through the player data and populate the table
    playerData.forEach((player, index) => {
        const row = document.createElement("tr");

        // Get the color assigned to the player
        const color = playerColors.get(player.name);
        if (color) {
            row.className = color;
        }

        row.innerHTML = `
        <td>${player.name}</td>
        <td>${player.points}</td>
        <td>${player.assists}</td>
        <td>${player.steals}</td>
        <td>${player.fga}</td>
        <td>${player.twoPm}</td>
        <td>${player.threePm}</td>
        <td>${player.rebounds}</td>
        <td>${player.blocks}</td>
        <td>${player.turnovers}</td>
        <td>${player.shotPercentage}</td>
      `;
        tableBody.appendChild(row);
    });
}
const sortableColumns = document.getElementsByClassName("sortable");
Array.from(sortableColumns).forEach((column) => {
    column.addEventListener("click", () => {
        const stat = column.getAttribute("data-stat");
        const currentOrder = column.getAttribute("data-order");

        sortByStat(stat, currentOrder);

        // Toggle the sorting order
        const newOrder = currentOrder === "asc" ? "desc" : "asc";
        column.setAttribute("data-order", newOrder);

        // Reset arrow symbols for all columns
        Array.from(sortableColumns).forEach((col) => {
            col.classList.remove("sort-asc", "sort-desc");
        });

        // Add arrow symbol for the clicked column
        column.classList.add(newOrder === "asc" ? "sort-asc" : "sort-desc");
    });
});

function sortByStat(stat, order) {
    playerData.sort((a, b) => {
        if (order === "asc") {
            return a[stat] - b[stat];
        } else {
            return b[stat] - a[stat];
        }
    });
    updateTable();
}

populateTable();