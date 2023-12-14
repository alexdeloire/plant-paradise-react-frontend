<div align="center">

# React Frontend for Plant Paradise

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License</a>.

---

### **Description**

Plant Paradise is a web application that allows you to discover and explore a plant encyclopedia, add new plants, and modify existing entries. Each user must log in to access plant content. Users can also access information about plant families and habitats. The website also has moderators who are responsible for reviewing and, if necessary, editing the posted content to ensure the quality of the site's content. Additionally, there are administrators whose role is to select the website moderators.

---

[Installation and Execution](#installation) •
[Documentation](#documentation) •
[Contributions](#contributions)

**Please read the the thourough [Documentation](Document_Architecture_Technique.pdf) provided**
</div>


## Features

There are three levels of users: Normal User, Moderator, and Admin. Here's what each can do:

Normal User:
- Browse plants.
- Search for plants.
- Add plants: A newly added plant will have an unverified status until a moderator verifies the content and changes its status. Other users can see the status of each plant.
- Modify existing plants: Any modification to a plant will change its status to unverified, and an admin must verify the modification. Other users will still be able to see this plant, but they will know that its status is unverified.
- Access information about plant families.
- Access information about habitats.

Moderator:
- Can do everything a normal user can do, as well as:
- Verify plant submissions, i.e., change their status to "verified" or "unverified."
- Delete plant submissions if necessary.
- Has a special tab that shows them the unverified submissions to facilitate management.

Admin:
- Can do everything a moderator can do, as well as:
- Change a user's role to moderator and vice versa.
- Mass-delete plants.
- Has a special tab to manage users.

## Table of Contents

- [Installation](#installation)
  - [Pre-requisites](#pre-requisites)
  - [Packages](#packages)
  - [Execution](#execution)
- [Documentation](#documentation)
- [Contributions](#contributions)
  - [Authors](#authors)
  - [Version control](#version-control)
  - [History](#history)

# Installation
<sup>[(Back to top)](#table-of-contents)</sup>

## Pre-requisites
<sup>[(Back to top)](#table-of-contents)</sup>

You're going to need node.js and npm installed on your machine. You can download them [here](https://nodejs.org/en/download/).

## Packages
<sup>[(Back to top)](#table-of-contents)</sup>

First you need to clone the repository:

```bash
git clone <repo_url>
```

Then you need to install the required packages:

```bash
npm install
```

## Execution
<sup>[(Back to top)](#table-of-contents)</sup>

To run the project, you need to run the following command:

```bash
npm start
```

# Documentation
<sup>[(Back to top)](#table-of-contents)</sup>

A thourough documentation is provided in the [Documentation](Document_Architecture_Technique.pdf) file.

# Contributions
<sup>[(Back to top)](#table-of-contents)</sup>

## Authors
<sup>[(Back to top)](#table-of-contents)</sup>

- [**Alexandre Deloire**](https://github.com/alexdeloire)

## Version control
<sup>[(Back to top)](#table-of-contents)</sup>

Git is used for version control. The project was done in sprint iterations, with a new version of the project being released at the end of each sprint.

## History
<sup>[(Back to top)](#table-of-contents)</sup>

The different sprint iterations of the project are available in this [repository](https://github.com/alexdeloire/plant_paradise_react_frontend).

The backend of the project is available in this [repository](https://github.com/alexdeloire/plant_paradise_api_node_backend).
