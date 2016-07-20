---
layout: post
title: GSoC'16 – Pubkey Encrypt – Week 8 Report
modified: 2016-07-20
comments: true
tags: [blog]
---

A discussion with Mehul Gupta (<a href="https://www.drupal.org/u/therealssj">@therealssj</a>), who is also a Google Summer of Code 2016 participant for Drupal, kicked off this week. So he is working on <a href="https://summerofcode.withgoogle.com/projects/#4630295898750976">porting Google Login Authenticator module to Drupal 8</a>. Like Pubkey Encrypt, his project has a dependency on Real AES module too. But Real AES for D8 is currently broken as it hasn’t been upgraded to work with the latest version of Defuse PHP Encryption library. Actually, Real AES relies on the master branch of that library, so it’s recent 2.x release broke the module. Currently, me and Mehul are using Test Encrypt module for our prototypes, while waiting for Real AES to get fixed. But since the end of GSoC is approaching and we really want to ship perfectly ready-to-use projects by the end, we’ve decided to collaborate on this issue and get the module fixed for us.

Accordingly, here are the two issues on which we’re working:

* <a href="https://www.drupal.org/node/2727845#comment-11391629">D8 - Update module to use Defuse PHP Encryption 2.0</a>
* <a href="https://www.drupal.org/node/2763787">Upgrade random_copmat to latest version</a>

My mentors Adam Bergstein (<a href ='https://www.drupal.org/u/nerdstein'>@nerdstein</a>) and Colan Schwartz (<a href='https://www.drupal.org/u/colan'>@colan</a>) are really happy about this collaboration since a number of other D8 modules in development, like <a href="https://github.com/d8-contrib-modules/file_encrypt">File Encrypt module</a>, also rely on Real AES. So getting the issue fixed is a win-win situation for all of us.

Next, I worked to integrate Batch API in the module. Colan suggested me to do this since the <a href ='http://www.talhaparacha.com/gsoc-2016-week-6-report/'>performance benchmarks for Pubkey Encrypt</a> revealed that the module initialization process takes a lot of time. Now with Batch API, the possibility of getting a premature PHP timeout, during that initialization process, has gotten eliminated.  Though the Drupal documentation for Batch API looks pretty intimidating, the code provided at <a href="http://hardcoredev.com/blog/using-batch-api-in-drupal-7-tutorial-in-simple-code/">“Using Batch API for Drupal - In Simple Code”</a> makes it really easy for anyone to learn the API.

<figure>
  <img src="http://www.talhaparacha.com/batch-api.png">
</figure>

In my weekly meeting with mentors, we discussed:

* The scenario when a user forgets his credentials but still wants to decrypt the content encrypted through Pubkey Encrypt. By definition of our mechanism (i.e. encrypting a piece of content with a user’s credentials), this case is impossible to be catered for. But we cannot simply ignore this scenario either, since users forgetting their credentials (and asking for password resets, for example) is a very common phenomena in real-world. So we need to make an architectural decision which should be a perfect compromise between security and usability, for our case. We have yet to agree upon a solution, but I’ve <a href="https://www.drupal.org/node/2767549">created a ticket in the issues queue</a> so to formally capture this requirement.
* The opportunity for me and Mehul to review each other's work. Since we both are under Adam’s supervision, he suggested us to do this and try to learn from each other’s skills and mistakes. We both are equally excited about it and have decided to do it in week 10.

Last week, I added this option of disabling roles into the Pubkey Encrypt settings form so to enhance module’s performance:

<figure>
  <img src="http://www.talhaparacha.com/disable-roles.png">
</figure>

As you might’ve already noticed, this option looks pretty bad from a usability point of view; I’m asking users to tick the roles to be disabled, which is unintuitive. Luckily, Colan pointed it out to me and recommended me to convert this option from “Disabled roles” to “Enabled roles”. So I made this little change and here’s how the form looks now:

<figure>
  <img src="http://www.talhaparacha.com/enabled-roles.png">
</figure>

To do this, I only made changes at the presentation layer i.e. the PubkeyEncryptSettingsForm class. This means that in the site’s configuration, the list of roles to be disabled (and not the roles to be enabled) are still getting stored. But during presentation, the form simply flips the checkboxes. My mentors have yet to comment on this approach of mine.

I then added these test assertions for this “enabled/disabled roles” feature to ensure that:

* If a role is disabled, then a user from that role is unable to access the corresponding Role key value.
* If a role is disabled, still any user with “administer permissions” permission is able to access the corresponding Role key value.

See all the code changes I did this week here: <a href="https://github.com/talhaparacha/pubkey_encrypt/compare/a28b6a78ec4a7b318fafc7f854ba94faa3e37e75...talhaparacha:c47f5f8adb70f81dceb4f28404ca2173957dc6d5">Pubkey Encrypt Week 8 Work.</a>

Lastly, I created a short video demonstrating a sample use-case of the module. I should mention here that we already have an architecture document for Pubkey Encrypt. And I plan to write a general introduction for the module along with some FAQs for the README file. So the purpose of this video is to only show an example of how Pubkey Encrypt can be used in real-world. Thus the audience for this video is assumed to be a bit familiar with the module.

Watch the video yourself and feel free to share your thoughts about it in the comments section:

<iframe src="https://player.vimeo.com/video/174876122?color=c9ff23" width="225" height="123" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
