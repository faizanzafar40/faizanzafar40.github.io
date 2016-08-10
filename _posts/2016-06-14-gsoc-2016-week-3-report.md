---
layout: post
title: GSoC’16 – Pubkey Encrypt – Week 3 Report
modified: 2016-06-14
comments: true
tags: [blog, drupal, gsoc]
---

The basic idea behind my project Pubkey Encrypt is to encrypt data using users’ login credentials. A tight integration with the <a href="https://www.drupal.org/project/key">Key module</a> is one of the most important parts in my project. So I started the week analyzing that module's architecture. It deals with administering keys which could be used for the purposes of encryption, authentication etc. Anyone can modify the key handling logic as per the business needs since the module allows for much extensibility via these three plugin systems:

* A key type plugin which deals with the responsibility of defining the purpose of a key.
* A key provider plugin which deals with the responsibility of storing and retrieving a key.
* A key input plugin which deals with the responsibility of taking & processing a key input from the user and then forwarding it to the key provider.

Initially, I thought I’d need to provide implementations for all these three plugins. Upon a closer analysis, I found out that it’s better for me to provide just an implementation for the key provider plugin as per my needs, and then use the default implementations for the other two plugins. This way saved me from doing any redundant work.

In my weekly meeting with mentors Adam Bergstein (<a href ='https://www.drupal.org/u/nerdstein'>@nerdstein</a>) and Colan Schwartz (<a href='https://www.drupal.org/u/colan'>@colan</a>), we discussed this approach I planned. Since Adam is one of the maintainers of Key module, he immediately understood the approach and gave it a thumbs up. Colan was happy too, so I moved forward and wrote an implementation for the key provider plugin.

The task involved writing a schema for my key provider plugin (which defines all the plugin settings to be stored in the configuration system) and then writing a class implementing <i>KeyProviderSettableValueInterface</i>. The business logic for my key provider is as follow:

* Upon a key storage, my key provider doesn’t store the actual key value. Instead, it encrypts the key value itself with the Public keys of all users from a specified role. It then stores these multiple encrypted copies of the key value in the configuration system.
* Upon a key retrieval, my key provider accesses the Private key of a user requesting the key value. It then uses it to decrypt the stored key value and returns it. It should be noted here that the module is being built in such a way that the Private key of any user is accessible only if the user is logged in (<a href="http://www.talhaparacha.com/gsoc-2016-week-1-report/">see Week 1 report</a> for more information on that).


<figure>
  <img src="http://www.talhaparacha.com/key-provider.png">
  <figcaption>
  A sample key using my key provider.
  </figcaption>
</figure>

<figure>
  <img src="http://www.talhaparacha.com/key-configuration.png">
  <figcaption>
  How that key is actually stored in the configuration system (notice that the actual key value has not been stored anywhere).
  </figcaption>
</figure>

This is the first time that I’ve realized the importance of modular code and the importance of extensibility in a software project. The Key module is designed in a way that all three plugin systems deal with independent and concise responsibilities. If it wasn’t the case, then I’d have been required to do a lot of work for integrating my project with the it. But now, I’ve achieved more by doing less.

Then I moved to the next task of programmatically creating and updating keys. Initially, I explored the FormBuilder API and figured out a very naive approach for doing the task, which involved programmatically submitting the Key create/edit form every time I wanted to create or update a key. My mentors suggested me to find a more efficient approach. After much exploration, I finally stumbled upon a very relevant issue related to the Key module, a feature request actually. The issue has now been closed and dealt with <a href="https://www.drupal.org/node/2693145">“adding a ‘set key value’ functionality to Key entity”</a>, which is exactly what I was looking for. Accordingly, the Key Manager service provided by the latest dev version of Key module has a method setKeyValue(). And executing it before calling the save() method on a Key entity gave me the solution.

After this, I implemented hook_user_role_insert/delete() and hook_user_update() for managing keys on the events of role creation/deletion and on the event of a user addition/removal from a role.

Have a look at the Pull Request which contains all work from this week along with my mentors’ comments on the work done: <a href="https://github.com/d8-contrib-modules/pubkey_encrypt/pull/4/files">https://github.com/d8-contrib-modules/pubkey_encrypt/pull/4/files</a>

Though I did not get to use the FormBuilder class, I’m still happy that I explored the API and learned much. Interestingly, there is an example on that API page for programmatically registering a new user via the user registration form. I found the example to be not working. Upon a root-cause analysis, I got to realize that a parameter for FormBuilder::submitForm() is documented incorrectly. The example used the parameter in the way it is currently documented. But since the documentation is incorrect, the example doesn't work. I’ve created two issues on D.O to fix these bugs on the API page:

* <a href="https://www.drupal.org/node/2747269">Incorrect parameter documentation for FormBuilder::submitForm</a>
* <a href="https://www.drupal.org/node/2747273">Example given on FormBuilder::submitForm API Page is not working</a>






