# React Frontend for Plant Paradise

**PLEASE READ THE DOCUMENTATION FOR MORE INFORMATION**

## Description

Plant Paradise is a web application that allows you to discover and explore a plant encyclopedia, add new plants, and modify existing entries. Each user must log in to access plant content. Users can also access information about plant families and habitats. The website also has moderators who are responsible for reviewing and, if necessary, editing the posted content to ensure the quality of the site's content. Additionally, there are administrators whose role is to select the website moderators.

## Main Features

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