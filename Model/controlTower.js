(function () {
  function ControlTower(name, code) {
    this.name = name;
    this.code = code;
    this.airPlanes = [];
    this.runwayBusy = undefined; // Pista de Decolagem
    this.airstripBusy = undefined; // Pista de Pouso

    this.register = function (airPlane) {
      this.airPlanes = [...this.airPlanes, airPlane];
    };

    this.unRegister = function (code) {
      this.airPlanes = this.airPlanes.filter((plane) => plane.code !== code);
    };

    this.getAirPlane = function (code) {
      return this.airPlanes.find((p) => p.code === code);
    };

    this.permissionTakeOff = function (code) {
      if (!this.runwayBusy) {
        this.runwayBusy = code;
        return true;
      } else {
        return false;
      }
    };

    this.freeRunaway = function (name, code) {
      this.unRegister(code);
      this.runwayBusy = undefined;
      this.airPlanes
        .filter((p) => p.isTakingOff)
        .forEach((p) =>
          p.receiveMessage(
            `CT#${this.name} say: ${name}#${code} Took off... Runway clear!`
          )
        );
    };

    this.permissionLanding = function (code) {
      if (!this.airstripBusy) {
        this.airstripBusy = code;
        return true;
      } else {
        return false;
      }
    };

    this.freeAirstrip = function (name, code) {
      this.unRegister(code);
      this.airstripBusy = undefined;
      this.airPlanes
        .filter((p) => p.isLading)
        .forEach((p) =>
          p.receiveMessage(
            `CT#${this.name} say: ${name}#${code} Landed... Airstrip clear!`
          )
        );
    };
  }

  globalThis.ControlTower = ControlTower;
})();
