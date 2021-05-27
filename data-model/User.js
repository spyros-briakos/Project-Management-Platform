class User {
  constructor(username, firstName, lastName, email, image, projects, invitations, plan_in_use, status, premium_ending_date) {
    setUsername(username);
    setFirstName(firstName);
    setLastName(lastName);
    setEmail(email);
    setImage(image);
    setProjects(projects);
    setInvitations(invitations);
    setPlan(plan_in_use);
    setStatus(status);
    setPremiumEndingDate(premium_ending_date);
  }

  setUsername(username) {
    this.username = username;
  }

  getUsername() {
    return this.username;
  }

  setFirstName(firstName) {
    this.firstName = firstName;
  }

  getFirstName() {
    return this.firstName;
  }

  setLastName(lastName) {
    this.lastName = lastName;
  }

  getLastName() {
    return this.lastName;
  }

  setEmail(email) {
    this.email = email;
  }

  getEmail() {
    return this.email;
  }

  setImage(image) {
    this.image = image;
  }

  getImage() {
    return this.image;
  }

  setProjects(projects) {
    this.projects = projects;
  }

  getProjects() {
    return this.projects;
  }

  setInvitations(invitations) {
    this.invitations = invitations;
  }

  getInvitations() {
    return this.invitations;
  }

  setPlan(plan_in_use) {
    this.plan_in_use = plan_in_use;
  }

  getPlan() {
    return this.plan_in_use;
  }

  setStatus(status) {
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  setPremiumEndingDate(premium_ending_date) {
    this.premium_ending_date = premium_ending_date;
  }

  getPremiumEndingDate() {
    return this.premium_ending_date;
  }
}