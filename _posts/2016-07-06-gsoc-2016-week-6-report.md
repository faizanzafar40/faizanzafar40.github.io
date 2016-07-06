---
layout: post
title: GSoC’16 – Pubkey Encrypt – Week 6 Report
modified: 2016-07-06
comments: true
tags: [blog]
---

Half of the Google Summer of Code coding period has passed and my project now has all the core functionality in it. For those who don’t know, Pubkey Encrypt is a D8 module in development, which aims to encrypt and secure websites’ data-at-rest using login credentials. I started week 6 work by finalizing everything we had done till then, so to get the module in shape for an immediate alpha release. I think it's very important to release the project early, with a bit less functionality and tagged as an alpha version, instead of releasing it with full functionality at the end of GSoC. This is because of the fact that the module deals with security. And as is the case with any security-related project, there is a lot of chance for unexpected issues to come up during alpha testing in a real-world environment. Luckily, we are ahead of the project timeline we planned in February, by a few weeks. So I’m confident that we’ll be able to tackle any such issues that might come up unexpectedly, no matter how severe they are.

First, I refactored the functional tests of the module by providing an abstract PubkeyEncryptTestBase class, which all concrete test classes of the module now extend. Accordingly, this abstract test base class deals with declaring dependencies required during testing, setting up the website, initializing module and any other stuff that is common to all concrete test classes. This change has brought the code more in line with the principles of Object-Oriented-Programming and hence much easier to maintain. I also added another class for testing Encryption profiles management which asserts for these capabilities in the module:

* Creation/Deletion of an Encryption profile upon creation/deletion of a role.
* Working of an Encryption profile i.e. successful encryption/decryption of data by the Encryption profile.
* Deletion of all relevant Encryption profiles upon module uninstallation.

Some refactoring was also done on the test class RoleKeysManagement as I figured that a few test assertions were missing there. I felt satisfied after completing this work phase. Now by running these tests I can easily verify whenever I want that any new feature I add to to the module wouldn’t end-up accidentally breaking any of the core functionality. This process is called Regression testing and is essential for any software project being built via an Agile methodology.

<figure>
  <img src="http://www.talhaparacha.com/module-tests.png">
</figure>

I then refactored all the project files so to make them follow coding standards, via the help of <a href="https://www.drupal.org/project/drupalcs">Drupal Code Sniffer</a>. I also realized that I made a terrible decision, a few weeks ago, to lessen my focus on coding standards in a thought of fixing it later. Due to this decision I ended up:

* Making a lot of really small changes to various different parts of the module in just a single commit, which is simply bad.
* Having my mentors review a few commits with some missing coding standards.

In my weekly meeting with mentors Adam Bergstein (<a href ='https://www.drupal.org/u/nerdstein'>@nerdstein</a>) and Colan Schwartz (<a href='https://www.drupal.org/u/colan'>@colan</a>), I notified them about the current progress and discussed with them a few approaches for benchmarking module performance. Even though the module is based on <a href="https://owncloud.com/wp-content/uploads/2015/07/Overview_of_ownCloud_Encryption_Model_2.2.pdf">ownCloud Data Encryption model</a> and is hence expected to be scalable, benchmarking the performance is still important:

* For us to discover and verify the performance bottlenecks.
* For organizations to realize that they can afford to use the module without severely affecting their site performance.

So, Adam pointed me to the XHProf tool for profiling PHP code and Colan pointed me to the really-useful Devel generate module for easily creating a lot of dummy content (users, nodes, etc).

I spent quite some time figuring out the approach I’d use for benchmarking and optimizing module’s performance. I learned that any profiling tool is used for finding out performance bottlenecks in the code. I also learned about the naive approach of simply calculating the time a piece of code takes to execute so to get a rough idea about its performance. After giving much thought, I proceeded with the naive approach. That’s because I pinpointed two tasks from the module’s architecture document that I know would definitely prove to be performance bottlenecks on large websites. So benchmarking and optimizing those tasks seemed more appropriate to me as compared to finding other unknown performance bottlenecks via a profiler. Here are these aforementioned tasks:

<h2>Generation of Asymmetric Keys:</h2>

This task involves the generation of a Public/Private key pair for all registered users on the website. It corresponds to a one-time event of module initialization. Here are the benchmarking results while using OpenSSL Keys Generator plugin, which is provided as a default choice in the module:

<figure>
  <img src="http://www.talhaparacha.com/keys-generation-benchmark.png">
</figure>

From the results, it is clear that the choice of key-size largely determines the time this task takes for completion. Some things to consider while making this choice are:

* 1024-bit keys take very less time for bulk generation. But they are not considered secure anymore so they should definitely not be used. In fact, that is why I haven’t even put an option for choosing this key size in the configuration UI for the default OpenSSL Keys Generator plugin.
* 2048-bit keys take moderate time for bulk generation and are considered secure too. But ownCloud Data Encryption Model, upon which this module is based, does not use these.
* 4096-bit keys are considered very secure and are also used in ownCloud Data Encryption Model. But these take a lot of time for bulk generation, hence a bit unsuitable for our use case which involves websites with thousands of users.

Have a look at this <a href="https://danielpocock.com/rsa-key-sizes-2048-or-4096-bits">article by Daniel Pock</a> for a detailed discussion on the choice of an asymmetric key size.

We definitely didn’t expect the task to take this much time while we were writing the architecture document. But the generation of a Public/Private key pair is considered to be an expensive operation. So by definition of this task, it is expected to take a lot of time depending on the number of users in a website. Hence we cannot expect to optimize this task much. Though it should be mentioned here that some libraries like Pure PHP Elliptic Curve library are quicker in generating asymmetric keys as compared to others like OpenSSL.

But I still tried to do some code optimization. I figured that the way I have written code, a lot of same plugin implementations get instantiated and used for this task. I tweaked the code to use only one plugin instance during the whole task execution. But that didn’t improve any performance at all. Probably, Drupal is smart enough to cache these things thereby eliminating my need for this optimization. So I didn’t commit the changes in favor of better code readability.

It should be mentioned again that this keys generation task would execute only once in the lifetime of module. So even though it slows down the module initialization time by a very big factor, it’s still a compromise I think we can afford to make. Afterall, security always come in the expense of usability. I’ll discuss these results with my mentors in our next meeting.

<h2>Updating a Role Key:</h2>

This task involves the re-generation of a Role key and employs the asymmetric keys for all users from a specified role. It corresponds to the event of addition of a user to a role. Here are the benchmarking results while using OpenSSL Keys Generator plugin, which is provided as a default choice in the module:

<figure>
  <img src="http://www.talhaparacha.com/rolekey-updation-benchmark.png">
</figure>

As can be seen, I was also able to optimize this task. So I figured that the way I had written code, a specific operation got executed hundreds of times. I tweaked the code to use cache for storing the operation’s result thereby eliminating the need for it to run again. I could've used the Cache API but I figured that for simplicity and ease-of-use, I should just use drupal static cache, in a slightly unusual way, for achieving the same result. Though I expected a performance gain of around 50-60%, I only got that of around 10-15%.
Lesson learned: use a cache only for data generated by expensive operations, otherwise you won’t get any huge performance gains usually promised by a cache.

Lastly, I’d just share an interesting bug fix I did this week. So while benchmarking the generation of asymmetric keys, I initially found out that keys of all sizes got generated in same time. This was completely unexpected, so there was clearly a bug somewhere. Afterall, a 1024-bit key should use less CPU time to get generated than a 4096-one. After hours of debugging, I discovered that the bug was because of the fact that the OpenSSL key size parameter required integer but was getting a string in code. And whenever a string is passed, OpenSSL falls back to the default behaviour of generating 1024-bit key instead of giving any error or notice. I think this bug fix was interesting because it shows the level of laser-sharp focus required by us developers for producing good code. And also because that makes me probably the first person to have ever fixed a bug while benchmarking performance. I don’t know whether to be happy or sad.

Thanks to the free and online <a href="https://www.amcharts.com/">AmCharts service</a> which I used for drawing charts. I absolutely loved their user interface and you should definitely have a look too.
