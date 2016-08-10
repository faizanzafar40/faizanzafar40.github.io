---
layout: post
title: GSoC’16 – Pubkey Encrypt – Week 1 Report
modified: 2016-05-29
comments: true
tags: [blog, drupal, gsoc]
---

I started the week writing a concise architectural document for the module. Though I had already written a timeline-based roadmap for the module, Adam (<a href ='https://www.drupal.org/u/nerdstein'>@nerdstein</a>) thought it’s still a good idea to write a separate architectural document which should elaborate how the module will respond to different events, how the module will integrate with its dependencies etc. My mentors reviewed the initial draft I wrote and after a few iterations we had an agreed upon architecture for the module. And Adam was right indeed, since now we also have a clear idea of all the module’s requirements from a development point of view.
Here’s the architectural document for Pubkey Encrypt if anyone wants to have a look: <a href="http://www.talhaparacha.com/PubkeyEncryptArchitectureDoc.pdf">talhaparacha.com/PubkeyEncryptArchitectureDoc.pdf</a>

The summary of the weekly scrum I had with my mentors is as follow:

* Colan (<a href='https://www.drupal.org/u/colan'>@colan</a>) thought for better visibility we should move the project to Drupal.org. But Adam didn’t want to lose the pull request reviews feature present in Github. So we've decided to use Github for coding and Drupal.org for issue tracking.
* We discussed a few design dilemmas that we didn’t have an immediate solution for. We think we need opinions of other community members on these issues before finalizing our approach. Since our current focus is on getting a working prototype of the module ready as soon as possible, we’ve decided to delegate these issues until an alpha version of the module is ready. Though I’ve documented them here: <a href="https://www.drupal.org/project/issues/2735805">drupal.org/project/issues/2735805</a>
* We discussed the tasks I plan to do for the week.

Then came the fun part; coding. Though initially I was a bit afraid; thoughts like what if I am not able to do all the tasks in time etc. came to my mind. But as soon as I started coding, my fear got converted into the profound joy of working as a GSoC participant and doing professional software development. This, along with the constant motivation from my mentors, made me work with really good focus. Here’s what I’ve achieved so far:

* Registered three fields into User entity for storing Public/Private key pairs of each user. Initially I hardcoded the fields in code and registered them as base fields. Later I changed them to YAML based files, which were much easier to register. All I did was create these new fields for the user entity from UI, import perspective configuration files and store them in the install directory of my module. I got the idea of using YAML based files by exploring the Password Policy module, which my mentor Adam pointed me to.
* Created a keys manager service which handles the business-logic for all these tasks:
    * Initialization of user fields
    * Protection of user fields
    * Response to the event of new user registration
    * Response to the event of a user password change
    * Response to the event of a user login
* Implemented hook_install, hook_form_alter, hook_user_login, hook_user_insert and within them, called my keys manager service for doing appropriate tasks.
* Implemented hook_requirements to take care of OpenSSL dependency.

I’ve created a pull request for all the work I’ve done this week and it’s currently pending a review from my mentors. Here's the code if anyone would like to take a quick look: <a href='https://github.com/talhaparacha/pubkey_encrypt/tree/96c817806ee2c3f7d30009f38f534d7b8bfe0fd7'>Pubkey Encrypt Commits Till 5/29/2016</a>

Interestingly, an important lesson I’ve learned this week is that I should be much more diligent when I’m writing code. Or I’d waste a lot of time covering for my silly mistakes. For example, I spent quite some time figuring out why my hooks were not being invoked, when I had mistakenly named the main module file as ".module.php". Similarly, while committing code in haste, I accidentally executed the last executed command in cmd which turned out to be "git reset –hard HEAD".
