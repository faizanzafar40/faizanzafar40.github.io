---
layout: post
title: GSoC'16 – Pubkey Encrypt – Week 9 Report
modified: 2016-07-26
comments: true
tags: [blog, drupal, gsoc]
---

I started the week by testing <a href="https://www.drupal.org/project/field_encrypt">Field Encrypt module</a> with my project Pubkey Encrypt. So Pubkey Encrypt provides support for encrypting data with users login credentials by generating Encryption Profiles. And Field Encrypt provides support to encrypt field values using any specified Encryption Profile. In this way, both these modules are expected to work together in harmony. I tested much and both the modules seemed to be getting along perfectly fine with each other.

When we were in the planning phase for Pubkey Encrypt, Field Encrypt had this issue that sometimes decrypted field data got cached when it was not supposed to. Due to the presence of three cache systems in Drupal 8, i.e. Static cache, Persistent cache and Render cache, the issue needed to be dealt with much care. So I committed in my GSoC proposal to dedicate the last two weeks towards fixing this issue. But interestingly, this issue has already been fixed and now there’s a checkbox in Field Encrypt settings via which a user can set a field as uncacheable.

<figure>
  <img src="http://www.talhaparacha.com/uncacheable.png">
</figure>

So I spent quite some time studying the architecture of Field Encrypt and exploring its codebase, so to learn how the maintainers of the module got rid of this cache-related issue. Turns out, whenever a field is requested to be set as uncacheable, the module simply marks the corresponding entity type as uncacheable via this code block in hook_entity_type_alter():

    {% raw %}
    foreach ($uncacheable_types as $uncacheable_type) {
      $entity_types[$uncacheable_type]->set('static_cache', FALSE);
      $entity_types[$uncacheable_type]->set('render_cache', FALSE);
      $entity_types[$uncacheable_type]->set('persistent_cache', FALSE);
    }
    {% endraw %}

After I had explored much of the Field Encrypt module, I thought I was in a good position to help in its issues queue. So I tried to fix these two issues:

* <a href="https://www.drupal.org/node/2743073">hook_entity_storage_load() is cached</a>
* <a href="https://www.drupal.org/node/2766885">Remove @file tag docblock from files that contain a namespaced class/interface/trait</a>


In my weekly meeting with mentors Adam Bergstein (<a href ='https://www.drupal.org/u/nerdstein'>@nerdstein</a>) and Colan Schwartz (<a href='https://www.drupal.org/u/colan'>@colan</a>) , we discussed:

* the GSoC project submission guidelines; we’ve decided to create a separate branch in <a href="https://github.com/d8-contrib-modules/pubkey_encrypt">Pubkey Encrypt github repo</a> with all the commits made during the 3-months of GSoC coding period. We think a link to that branch would meet <a href="https://developers.google.com/open-source/gsoc/help/work-product">Google Work Product Submission Guidelines</a> and would make it easy for anyone to figure out the work I’ve done as a GSoC participant.
* the scenario of an unprivileged user trying to access the Role key value; we’ve decided to throw an error message instead of an exception so to ensure a graceful shutdown of the encryption/decryption mechanism instead of a complete system hault.
* the scenario of a user trying to change his login credentials without providing existing credentials; we’ve decided to not allow a user do this via a custom form validator for user_form. This means that the password-reset functionality, and other similar features, won’t work on a website with Pubkey Encrypt enabled.
* the possibility of a feature to ask users, via email, to perform the one-time login when Pubkey Encrypt gets initialized. We think this feature would make it easy for others to use the module. I’d work on it in next week. For now, I’ve <a href="https://www.drupal.org/node/2770429">created an issue ticket</a> to formally capture this need.

Next I worked on fine-tuning the module documentation; I updated the Architecture document to reflect the latest status of the module, I added a User-stories document to provide step-by-step instructions for using the module with Field Encrypt and I wrote a README file to get unfamiliar users acquainted with the module. I’ve also tried to use simple phrases and real-life examples instead of the technical jargon whenever possible but especially in the README file. One of the results of that effort is that the module’s description has now been changed from a much confusing phrase “Adds support for Credentials-based Public key Encryption support into Field Encrypt” to a relatively simple one “Provides support for encrypting data with users login-credentials”.

I then bundled the default plugins provided by the modules as submodules within the modules. So, for example, now we have pubkey_encrypt_openssl and pubkey_encrypt_phpseclib modules within the pubkey_encrypt module; the former provides an OpenSSL-based Asymmetric Keys Generator plugin implementation while the latter provides a PHPSecLib-based one. In both the modules, hook_requirements() ensures the presence of corresponding external dependencies.

I then worked on an overview page for Pubkey Encrypt. So the module generates Encryption Profiles for each role in the website. But an Encryption Profile for any role should only be used if all users from the corresponding role have performed the one-time login. Otherwise, the security mechanism provided by Pubkey Encrypt won’t work to its full potential. Previously, there was no way of knowing which Encryption Profiles generated by Pubkey Encrypt are ready-to-use and which are not. Now, there exists this overview page:


<figure>
  <img src="http://www.talhaparacha.com/overview.png">
</figure>

Then I worked on an experimental feature for the module which involves using cookies for temporarily storing the Private key of any logged-in user. Actually whenever a user logs in, Pubkey Encrypt uses the user’s login-credentials to decrypt his Private key and then temporarily stores the decrypted Private key in a session. We are currently using sessions because ownCloud Data Encryption Model, on which this module is based, uses sessions. But there’s this idea of shifting to cookies, though I have yet to discuss it in detail with my mentors.  Even though we have not made any final decision yet, I have still started working on this feature. Because if we do decide to use it, it’d be already there in an experimental branch. And if we decide not to use it, still I’d have learned how to use cookies in a Drupal 8 website.

Since cookies need to be set in HTTP headers, I cannot simply call the set_cookie() method in a user_login() hook. And because hook_init() isn’t present in Drupal 8, I cannot use it either for setting content headers. After much exploration, I finally did it by creating an event subscriber to KernelEvents::RESPONSE and calling $event->getResponse()->headers->setCookie($cookie) in the corresponding event callback function. As expected, Pubkey Encrypt encryption mechanism is working perfectly fine with cookies too. Though the tests are breaking and I have yet to fix those.

See all the code changes I did this week here: <a href="https://github.com/talhaparacha/pubkey_encrypt/compare/c47f5f8adb70f81dceb4f28404ca2173957dc6d5...talhaparacha:2618335d6d6f400553af4ed1608241be4e87f08b">Pubkey Encrypt Week 9 Work.</a>

At this point, I’m pleased to announce that all the work which I planned to do in my GSoC proposal three months ago, has been done. I’m super happy about the fact that I still have 3 weeks left and I’ll try to utilize them in the best way possible.
