---
layout: post
title: GSoC’16 – Pubkey Encrypt – Week 2 Report
modified: 2016-06-06
comments: true
tags: [blog, drupal]
---

I started the week iterating over last week’s work as per the reviews of my mentors Adam Bergstein (<a href ='https://www.drupal.org/u/nerdstein'>@nerdstein</a>) and Colan Schwartz (<a href='https://www.drupal.org/u/colan'>@colan</a>). They were happy with the progress I had made and only pointed out a few minor things that required modifications. Here are the relevant commits involving those minor changes: <a href='https://github.com/talhaparacha/pubkey_encrypt/commit/dbd946fc7c0adddd21ba5d6e9e52e915bd674b37'>Pubkey Encrypt - Commit#dbd94</a> & <a href='https://github.com/talhaparacha/pubkey_encrypt/commit/e3defd56f616b974810c0cca52149449344e1a8d'>Pubkey Encrypt - Commit#e3defd</a>.

In our weekly meeting, we identified two additional pluggable systems that could really increase the customizability of our module. And since the module deals with security, it’s better if we allow users to easily configure the module as per their needs and organizational standards. Here are those:


* <a href='https://www.drupal.org/node/2738847'>Asymmetric Keys Generator Plugin:</a> Currently, I’ve hardcoded the module to use 4096-bits RSA-based Public/Private keys generated via OpenSSL library while using sha512 hash functions, just like ownCloud is doing in their implementation. But we can move this to a pluggable system so to allow developers to use any library in any configuration for the purpose of these asymmetric keys generation.
* <a href='https://www.drupal.org/node/2738839'>User Credentials Provider Plugin:</a> Currently, I’ve hardcoded the module to use users login-passwords, just like ownCloud is doing in their implementation. But we can move this to a pluggable system so to allow developers to use other form of credentials like PIN, Date-of-Birth etc. too. In fact, doing this would change our module’s description from “Password-based Public Key Encryption” to “Credentials-based Public Key Encryption”. And this is what we’ve been aiming for since we wrote the architecture document.

But we’ve decided not to accomplish this right now. That’s because our current focus is on developing a working-prototype of the module. And for a prototype, hardcoded configurations based on the ownCloud implementation would work perfectly fine. In fact, I’ve already reserved week 11 for adding custom configurations support in the module so these tasks would get done then. Though I created the relevant issue tickets this week so to formally capture these two requirements.

As for the main work done in the week, I wrote functional tests for the keys manager service I created last week. The tests cover the module’s response in events of:

* User registration.
* User login.
* User credentials change.

Writing tests looked a quite straight-forward task to me in start. But a massive amount of my time got spent in finding and fixing a nasty bug, which was causing my module to not install successfully in the testing environment. And the reason turned out to be missing dependencies. Coming from a D7 development background, I assumed that the default installation profile in SimpleTest environment is “Standard”. So while listing the dependencies, I thought I only needed to mention “Key” and “Encrypt” which are the apparent dependencies of the module. Turns out, <a href='https://www.drupal.org/node/1911318'>Drupal 8’s SimpleTest environment uses a minimal installation profile “Testing”</a> to speed some things up. And the tutorial I was initially following to write tests didn’t feel the need to point it out. Setting the right installation profile explicitly in the test class solved my problem.

Also, I created three test methods for covering the three events I mentioned earlier though I could’ve used one. I did it for the sake of improving code readability but this has hampered code speed since SimpleTest prepares a fresh environment for each test method one writes. But I guess that’s a compromise we can afford.

Here are the tests if anyone wants to have a look: <a href='https://github.com/talhaparacha/pubkey_encrypt/commit/535f8fe4e16fe3a1951624197c5aa2f183cfb185'>Pubkey Encrypt - Commit#535f8</a>. My mentors have yet to review this code.

<figure>
  <img src="http://www.talhaparacha.com/user-keys-management-tests.png">
  <figcaption>
    When your code passes the tests :')
  </figcaption>
</figure>

Interestingly, I’ve now gotten a bit more comfortable with exploring different modules. For writing tests, I explored some tests written for Password Policy and User modules since some assertions there, are pretty similar to what I was planning for my tests. I also consulted the Drupal API several times. Like I was looking for a way to flush entities cache and the API for EntityInterface had these two functions documented: resetCache() & loadUnchanged(); the former resets the static entity cache and the latter fetches an entity directly from the database bypassing any cache hits. I think this experience of figuring things out on my own would prove to be really valuable in my journey of being a good software engineer.
