(function () {
  function AirPlane(name, code, ctrlTw, secondsTOff, secondsLand, isLading) {
    this.name = name;
    this.secondsTakeOff = secondsTOff * 1000;
    this.secondsLand = secondsLand * 1000;
    this.code = code;
    this.controlTower = ctrlTw;
    this.isLading = isLading;
    this.isTakingOff = !isLading;
    this.tryCount = 0;
    const $this = this;

    this.receiveMessage = function (msg) {
      console.log(`${new Date().toJSON().split('T')[1]} >> `, msg);
    };

    this.btnHandleTakeOff = function ({ target }) {
      if (!$this.controlTower.permissionTakeOff($this.code)) {
        target.innerText = `Taking Off Reject 🚩 Retry(${$this.tryCount++})...`;
        return;
      }
      target.innerText = 'Accepted 🟩 Taking Off...';
      target.disabled = 'disabled';

      setTimeout(() => {
        $this.isTakingOff = false;
        target.innerText = 'Took Off!!! 😄';
        $this.controlTower.freeRunaway($this.name, $this.code);
      }, $this.secondsTakeOff);
    };

    this.btnHandleLand = function ({ target }) {
      if (!$this.controlTower.permissionLanding($this.code)) {
        target.innerText = `Landing Reject 🚩 Retry(${$this.tryCount++})...`;
        return;
      }
      target.innerText = 'Accepted 🟩 Landing...';
      target.disabled = 'disabled';

      setTimeout(() => {
        $this.isLading = false;
        target.innerText = 'Landed!!! 😄';
        $this.controlTower.freeAirstrip($this.name, $this.code);
      }, $this.secondsLand);
    };
  }

  globalThis.AirPlane = AirPlane;
})();
