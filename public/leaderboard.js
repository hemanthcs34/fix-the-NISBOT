document.addEventListener("DOMContentLoaded", async () => {
  const _0x2ad8be = document.getElementById("leaderboard-list");
  const _0x49622e = document.getElementById("leaderboard-loading");
  try {
    const _0x331133 = await fetch("https://nisbot-wumpus.onrender.com/api/leaderboard");
    if (!_0x331133.ok) {
      throw new Error("HTTP error! Status: " + _0x331133.status);
    }
    const _0x50e523 = await _0x331133.json();
    if (_0x50e523.length === 0x0) {
      _0x49622e.textContent = "No scores yet. Be the first!";
    } else {
      _0x49622e.style.display = "none";
      _0x50e523.forEach(_0x2f9685 => {
        const _0x137f8b = document.createElement('li');
        _0x137f8b.textContent = _0x2f9685.name + " - " + _0x2f9685.totalscore;
        _0x2ad8be.appendChild(_0x137f8b);
      });
    }
  } catch (_0x4b35da) {
    console.error("Error loading leaderboard:", _0x4b35da);
    _0x49622e.textContent = "Could not load leaderboard. Check the server connection.";
  }
});