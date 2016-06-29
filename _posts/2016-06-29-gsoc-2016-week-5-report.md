---
layout: post
title: GSoC’16 – Pubkey Encrypt – Week 5 Report
modified: 2016-06-29
comments: true
tags: [blog]
---

This week I worked on making the module a bit flexible via integrating pluggable systems into it. This is something we had planned initially while writing the <a href="http://www.talhaparacha.com/PubkeyEncryptArchitectureDoc.pdf">architecture document for the module</a>, but couldn't pursue it earlier because our focus was on developing a working prototype first. But since that’s done, we’ve reached the perfect time for this development. It should be noted that the pluggable systems are important because Pubkey Encrypt deals with security, and it is essential for the module’s success to be as flexible as possible. In this way, users would be able to configure the behavior of the module as per their organizational security standards and other demands not provided by the out of the box functionality.

Accordingly, here are the two pluggable systems (i.e. plugin types) I added to the module:

* Asymmetric keys generator: An implementation for this plugin type would address the responsibilities of Public/Private keys generation, encryption of a piece of content with Public key and decryption of a piece of encrypted content with Private key.

By having this logic encapsulated into a pluggable system, users would be able to use the asymmetric keys generator of their choice (e.g. OpenSSL library, Elliptic curve cryptography library etc.) simply by providing a corresponding plugin implementation.

* Login credentials provider: An implementation for this plugin type would handle the selection of relevant user data attributes needed for key generation which Pubkey Encrypt would use during data encryption/decryption operations.

By having this logic encapsulated into a pluggable system, users would be able to use the login credentials of their choice (e.g. password, PIN etc.) simply by providing a corresponding plugin implementation.

For developing the pluggable systems, I referred to this really great article on D8 plugins, <a href='https://drupalize.me/blog/201409/unravelling-drupal-8-plugin-system'>Unravelling the Drupal 8 Plugin System</a>, provided by Drupalize.me. This in-depth article not only describes the higher-level overview of Drupal 8 plugins but also contains a step-by-step tutorial on creating your own plugin types along with some sample code. So I created the plugin systems and then added the configuration layer as an “Initialization settings form”. Through this form, users would configure and initialize the module so it could start working. See it in action here:

<figure>
  <img src="http://www.talhaparacha.com/Initialization-settings-default.png">
  <figcaption>
  Pubkey Encrypt initialization settings form.
  </figcaption>
</figure>

In my weekly meeting with mentors Adam Bergstein (<a href ='https://www.drupal.org/u/nerdstein'>@nerdstein</a>) and Colan Schwartz (<a href='https://www.drupal.org/u/colan'>@colan</a>), we discussed the overall architecture of the pluggable systems I implemented. We also made yet another design-related decision that we won’t be allowing anyone to change their choice of plugins once the module has been initialized. The reason is, that allowing for a plugin change after the module is initialized means re-initialization of all users’ keys and re-encryption of all data. And this is the kind of use-case we’ll never encourage as the process involved will have a lot of overhead on the module’s performance. So this basically means that if a user has chosen to use OpenSSL library for the generation of asymmetric keys, then he’s bound to use that for the lifetime of module. If he really wants to change any plugin, the only option available for him would be to uninstall and reinstall the module as per his desired configuration. I’ve <a href="https://www.drupal.org/node/2756739">created an issue</a> on the D.O project page to formally capture this decision.

<figure>
  <img src="http://www.talhaparacha.com/form-after-initialization.png">
  <figcaption>
  Restricting the change of plugins after the module has been initialized.
  </figcaption>
</figure>

Then I wrote default plugins for the two pluggable systems, so to make the module behave as a plug-and-play solution for typical use cases. We’ll ship the following default plugins via a submodule within the module:

* RSA-based asymmetric keys generator using OpenSSL php extension.
* User passwords-based login credentials provider.

After integrating the pluggable systems into module, I thought it’d be really cool if I could make the “asymmetric keys generator” plugin type configurable from the UI. The reason is, that a keys generator plugin could ask for user configuration like key size, digest method etc. I couldn’t find any tutorial on how to do this, but I figured out that the Encrypt module provides one such configurable plugin type. So I used the source code from the Encrypt module for learning how to accomplish the task, but still got stuck in it for two days. Though I really enjoyed the learning process and after spending hours exploring Encrypt’s source code and running it step-by-step via a debugger for better understanding, I finally accomplished the task. I also tweaked the default asymmetric keys generator plugin to reflect this change so to make it easy for other developers to use this default plugin implementation as an example of how their plugin implementations can handle the user configuration. See it in action here:

<figure>
  <img src="http://www.talhaparacha.com/openssl-configurable-plugin.png">
  <figcaption>
  An Asymmetric Keys Generator plugin configurable from the UI.
  </figcaption>
</figure>

After that, I fixed the tests to have the module initialized before making any assertions. Re-running the tests revealed that everything is working completely as expected. Have a look at all the work I did this week here: <a href="https://github.com/talhaparacha/pubkey_encrypt/compare/37e9f38c15a7c7db4bc901d9489e3aa85ab18ec7...talhaparacha:5d0d993ee8fee762522c14acdde5a9f1adb46d50">Pubkey Encrypt - Week 5 work</a>. My mentors have yet to review and merge the commits.
