(function () {
  const CONTROL_TWS = ['SAO-CGH', 'RIO', 'FLN'];

  document.getElementById('start').onclick = (ev) => {
    //Params
    const name = CONTROL_TWS[Math.floor(Math.random() * CONTROL_TWS.length)];
    const code = String(Math.random() * 3).substring(2, 10);

    //ATC class
    window.controlTower = new window.ControlTower(name, code);
    const controlTowerElem = window.createControlTowerElement(name, code);

    document.body.appendChild(controlTowerElem);
    document.body.removeChild(document.getElementById('start'));
  };
})();
