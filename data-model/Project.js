class Project {
  constructor(_id, name, description, productOwner, srcumMaster, sprints, members, status, plan_in_use, startingDate, endingDate) {
    setId(_id);
    setName(name);
    setDescription(description);
    setProductOwner(productOwner);
    setScrumMaster(scrumMaster);
    setSprints(sprints);
    setMembers(members);
    setStatus(status);
    setPlan(plan_in_use);
    setStartingDate(startingDate);
    setEndingDate(endingDate);
  }

  setId(_id) {
    this._id = _id;
  }

  getId() {
    return this._id;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDescription(description) {
    this.description = description;
  }

  getDescription() {
    return this.description;
  }

  setProductOwner(productOwner) {
    this.productOwner = productOwner;
  }

  getProductOwner() {
    return this.productOwner;
  }

  setScrumMaster(scrumMaster) {
    this.scrumMaster = scrumMaster;
  }

  getScrumMaster() {
    return this.scrumMaster;
  }

  setSprints(sprints) {
    this.sprints = sprints;
  }

  getSprints() {
   return this.sprints; 
  }

  setMembers(members) {
    this.members = members;
  }

  getMembers() {
    return this.members;
  }

  setStatus(status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  setPlan(plan_in_use) {
    this.plan_in_use = plan_in_use;
  }

  getPlan() {
    return this.plan_in_use;
  }

  setStartingDate(startingDate) {
    this.startingDate = startingDate;
  }

  getStartingDate() {
    return this.startingDate;
  }

  setEndingDate(endingDate) {
    this.endingDate = endingDate;
  }

  getEndingDate() {
    return this.endingDate;
  }
}

module.exports = Project;