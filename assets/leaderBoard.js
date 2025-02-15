let ascending = true;
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
addEntry('Atena', 100);
addEntry('Mahdi', 95);
addEntry('Rasa', 93);
document.getElementById('sortButton').addEventListener('click', sortLeaderboard);
