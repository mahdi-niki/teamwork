const apiUrl = 'https://67b24495bc0165def8cd2771.mockapi.io/users';
let ascending = true;

async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        data.forEach(user => addEntry(user.name, user.score));
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function addEntry(name, score) {
    const leaderboardBody = document.getElementById('leaderboard-body');
    const newRow = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = name;
    const scoreCell = document.createElement('td');
    scoreCell.textContent = score;

    newRow.appendChild(nameCell);
    newRow.appendChild(scoreCell);

    leaderboardBody.appendChild(newRow);
}

function sortLeaderboard() {
    const leaderboardBody = document.getElementById('leaderboard-body');
    const rows = Array.from(leaderboardBody.querySelectorAll('tr'));

    rows.sort((a, b) => {
        const scoreA = parseInt(a.cells[1].textContent);
        const scoreB = parseInt(b.cells[1].textContent);
        return ascending ? scoreA - scoreB : scoreB - scoreA;
    });
    leaderboardBody.innerHTML = '';
    rows.forEach(row => leaderboardBody.appendChild(row));
    ascending = !ascending;
}

document.getElementById('sortButton').addEventListener('click', sortLeaderboard);
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = '../index.html';
});

fetchData();
