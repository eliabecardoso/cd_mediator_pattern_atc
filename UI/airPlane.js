(() => {
  const AIR_PLANES = ['A380', 'B747', 'B777', 'A320', 'E-Jets', 'CRJ'];

  //Element
  globalThis.createPlaneButton = function () {
    const addPlaneBtn = document.createElement('button');
    addPlaneBtn.classList.add('controlTower');
    addPlaneBtn.innerText = 'Add Plane';
    addPlaneBtn.onclick = handleAddPlane;
    return addPlaneBtn;
  };

  function createPlaneElement({
    name,
    code,
    isLading,
    btnHandleTakeOff,
    btnHandleLand,
  }) {
    const mainDiv = document.createElement('div');
    mainDiv.setAttribute('id', code);
    const span = document.createElement('span');
    span.innerText = `${name}#${code} - Status: ${
      isLading ? '✈️⏩🗼...' : '🗼⏩✈️...'
    }`;

    const handler = isLading ? btnHandleLand : btnHandleTakeOff;
    mainDiv.appendChild(span);
    mainDiv.appendChild(createButtonPlaneRequest(code, isLading, handler));
    return mainDiv;
  }

  function createButtonPlaneRequest(code, isLading, handler) {
    const btn = document.createElement('button');
    btn.setAttribute('id', code);
    if (isLading) {
      btn.innerText = 'Request Landing 🟦';
      btn.onclick = handler;
    } else {
      btn.innerText = 'Request Taking Off 🟦';
      btn.onclick = handler;
    }
    return btn;
  }

  //Handlers
  function handleAddPlane(ev) {
    //Params
    const name = AIR_PLANES[Math.floor(Math.random() * AIR_PLANES.length)];
    const code = String(Math.random() * 3).substring(2, 6);
    const secTOff = [5, 10, 15][Math.floor(Math.random() * 3)];
    const secLand = [5, 10, 15][Math.floor(Math.random() * 3)];
    const isLading = !!Math.round(Math.random());

    const airPlane = new AirPlane(
      name,
      code,
      globalThis.controlTower,
      secTOff,
      secLand,
      isLading
    );
    globalThis.controlTower.register(airPlane);

    document
      .getElementById(globalThis.controlTower.code)
      .appendChild(createPlaneElement(airPlane));
  }
})();
