let refreshInterval = 1000; // default 1s
let intervalId = null;

function fetchCpuInfo() {
  cockpit.spawn(["/usr/share/cockpit/cockpit-raspi-cpu/cpuinfo"])
    .then(function (data) {
      const info = JSON.parse(data);
      renderTable(info.cpus);
    })
    .catch(function (error) {
      document.getElementById("cpu-table").innerText = "Error: " + error;
    });
}

function renderTable(cpus) {
  let html = `
    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>CPU</th>
            <th>Current Freq (kHz)</th>
            <th>Min Freq</th>
            <th>Max Freq</th>
            <th>Temp (°C)</th>
          </tr>
        </thead>
        <tbody>
  `;

  let totalTemp = 0, count = 0;
  cpus.forEach(cpu => {
    html += `
      <tr>
        <td>${cpu.id}</td>
        <td>${cpu.cur_freq}</td>
        <td>${cpu.min_freq}</td>
        <td>${cpu.max_freq}</td>
        <td>${cpu.temp}</td>
      </tr>`;
    if (cpu.temp !== "N/A") {
      totalTemp += parseFloat(cpu.temp);
      count++;
    }
  });

  html += `</tbody></table></div>`;

  if (count > 0) {
    html += `<div class="avg-temp">Average Temp: ${(totalTemp / count).toFixed(2)} °C</div>`;
  }

  document.getElementById("cpu-table").innerHTML = html;
}

function startAutoRefresh() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(fetchCpuInfo, refreshInterval);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCpuInfo();
  startAutoRefresh();

  document.getElementById("refresh-rate").addEventListener("change", function () {
    refreshInterval = parseInt(this.value);
    startAutoRefresh();
  });
});