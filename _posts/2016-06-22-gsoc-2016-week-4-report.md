---
layout: post
title: GSoC’16 – Pubkey Encrypt – Week 4 Report
modified: 2016-06-22
comments: true
tags: [blog]
---

I started the week by providing test coverage for functionalities I added to the module in week 3. Since the main functionality I added was the automatic generation of keys, the tests I wrote assert for these capabilities:

* Creation/deletion of a Role key upon creation/deletion of a Role.
* Ability of a user to access a Role key if he is in the corresponding role.
* Inability of a user to access a Role key if he is not in the corresponding role.
* Ability of an admin to access any Role key.

Testing also revealed a subtle bug in previous week’s work in the form of an uncaught exception. Actually the Role keys were getting saved with values which conflicted with the entity’s schema. The reason is that while programmatically generating a key entity, I was setting its Key Input plugin as “text_field”. But this input plugin should be used if the key is being manually created from the key generation from. Otherwise, the form submission handler won’t get to perform some necessary duties. So the solution is to set the Key Input plugin as “none” whenever creating a key entity programmatically.

In my weekly meeting with mentors Adam Bergstein (<a href ='https://www.drupal.org/u/nerdstein'>@nerdstein</a>) and Colan Schwartz (<a href='https://www.drupal.org/u/colan'>@colan</a>), we discussed a few vital architectural issues related to the module:


* Initially, I was giving only the root user (uid = 1) complete control over all Role keys. But actually, any privileged user with the capability of adding/removing other users from roles must be given this complete control. We figured that using a combination of permissions “administer keys” + “administer users” will filter out all these privileged users whom we can then give complete control, but that will also make the module unnecessarily complex for others to understand. So after a detailed discussion, we decided to give any user with “administer permissions” permission complete control over all Role keys.

* Our module involves login credentials in the encryption/decryption phases. Hence by definition, the mechanism is built in such a way that a user can access encrypted data only if he’s logged into the site. So we’ve decided to force logout all active users in the website, including the administrator, whenever the module is installed. This would ensure that after our mechanism has kicked in, all users would be required to login. This decision would hamper user experience a bit, but it’s a compromise we have to make for enhanced security. Though I’ve still <a href="https://www.drupal.org/node/2750419">created an issue</a> to discuss the implications of this decision with the community.


So I iterated over the PR as per these decisions and as per some other comments of my mentors. The PR has been re-reviewed by both my mentors, and is now ready to be merged. Have a look at it here: <a href="https://github.com/d8-contrib-modules/pubkey_encrypt/pull/4">Pubkey Encrypt PR - Generation of Role keys & Share keys</a>

Then I moved forward to integrating my module with Encrypt module. The task involved generating Encryption profiles for each Role key. I finished it quickly since I already had the experience of programmatically creating entities from week 3’s work. I should mention here that each Encryption profile is supposed to have an encryption method in it. For practical purposes, one should definitely use a high-quality, modern & secure encryption method. The module Real AES provides one such method. But since it's D8 port is under development, I’ve decided to currently use “test_encrypt” encryption method, which comes bundled with the Encrypt module specifically for testing purposes.

At this point, I was done with all the tasks required for building a working prototype for the module. So I smoke tested the module which interestingly revealed two missing use-cases which I had not coded for:

* Whenever a user is registered with “administer permissions” permission, he should be given complete control over all Role keys.
* Whenever the module is uninstalled, the relevant Encryption profiles must be deleted.

I fixed the module to cater for these two use-cases. But then a major chunk of my time got spent into fixing a very random bug in the module. So I found out that whenever cron ran, users’ Public/Private keys (which get attached as fields to the user entity) got deleted. This was completely unexpected.

So I made a test module with very simple logic in it; the module just added a field to user entity and tried to fill it with data upon installation. The bug still persisted; whenever cron ran, the field data got removed. After much exploration, I found out that manually calling config.installer service fixed the problem. But this technique shouldn't have fixed the problem, as config.installer service always gets called when a module is installed. Due to this randomness of the bug, I checked my solution’s behavior on a clean Drupal installation. And this is when I figured out that the bug wasn’t in the code, but in my previous environment. Since everything worked perfectly fine in the new environment. I’m glad that I spent extra time analyzing the root cause of this problem. Otherwise I'd have just moved on with the naïve solution I got and would've always thought that these extra lines of code are there as a bug fix.

Have a look at all the code I wrote this week here: <a href="https://github.com/talhaparacha/pubkey_encrypt/compare/66e01d63224fc9e18aa0c5744e35ccf48e2964ad...talhaparacha:37e9f38c15a7c7db4bc901d9489e3aa85ab18ec7">Pubkey Encrypt Week 4 work</a>.

I believe that now we’ve hit a major milestone in the project. In the next few days, my mentors will smoke test the module. And if they give it a thumbs up, we will release an alpha version of the module on D.O.

Lastly, I’d just like to mention that one of the bugs in Drupal which I discovered a few weeks ago just got fixed, and the <a href="https://www.drupal.org/node/2747269">patch committed to both 8.2.x and 8.1.x</a>. Though the impact of the bug was little, but this still feels super awesome. Since along with working on my own project, I’m also getting opportunities to improve Drupal core. Due to this, I feel even happier to be a part of Google Summer of Code. Because I know I wouldn’t have been doing this kind of interesting work in any other internship.
