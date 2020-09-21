(() => {
  globalThis.createControlTowerElement = function (name, code) {
    const controlTowerDiv = document.createElement('div');
    controlTowerDiv.setAttribute('id', code);
    controlTowerDiv.classList.add('controlTower');
    controlTowerDiv.appendChild(appendControlTowerLabel(name));
    controlTowerDiv.appendChild(globalThis.createPlaneButton());
    return controlTowerDiv;
  };

  function appendControlTowerLabel(name) {
    const label = document.createElement('label');
    label.innerText = `Control Tower #${name}`;
    return label;
  }
})();
