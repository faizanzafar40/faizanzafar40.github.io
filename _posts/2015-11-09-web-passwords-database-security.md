---
layout: post
title: A New & Simple Technique for Securely Storing Passwords in Databases
modified: 2015-11-09
comments: true
tags: [blog]
---

Storing website passwords *securely* in databases has turned out to be a major challenge than anyone had ever imagined. 13 million passwords stored by the cheap webhosting service got leaked in plaintext just a week ago. Two parties are mainly blamed for this chaotic security situation; (i) the web developers who don’t employ state of the art security techniques while developing authentication systems; like in 2012, 6.5 million LinkedIn accounts were breached only because the company didn’t implement an extremely simple security practice (ii) the users themselves who, for example, still in 21st century choose easy-to-guess passwords like “123456” or “qwerty”. Combine this with the inherent security vulnerabilities of digital systems and you’ll have an explanation for the present state. Google, Facebook and all other major web services are now encouraging users to enable “Two-factor authentication” for their accounts which in addition to a password requires that a user has his mobile phone with him when logging in to the application. But still, hundreds of thousands of web applications authenticate users based on passwords. So passwords are not going anywhere, at least not for the next 5 years.

Here I present a new innovative and simple technique for securely storing passwords in databases so even in cases of database breaches, the hackers won’t be able to actually access any accounts. I’ll start by giving a context of where we currently stand, the faults in the contemporary system and will then put forward my idea for improving it. Feel free to jump at the end if you only wanna know about the technique.

##The Context:

Following techniques are employed by web developers for achieving state-of-the-art passwords security in their apps:

**(Skip this if you already know about hashing, salting, rainbow tables etc.)**

1) Passwords are never stored as they are. Each password gets passed through a special hashing function to generate a lengthy unique string (called hash) which then gets stored in the database. For instance a popular hashing function MD5 generates the hash “7d2731ef68f1d34e02a42aedaaf68cad” for the string “talha”. Now main feature of a hashing function is that it only works in one direction. This means that one can easily calculate hash from a string but cannot easily break that hash into the string back. In this way even if a hacker gets read access to a database, simply by looking at it won’t tell him the password of any user.

2) So then the hacker employs brute force attack; he simply starts generating hashes for every possible combination of characters of some certain length, checks every time whether a hash matches any of the hashes present in the database, if it does this means that the string used for generating that particular hash was the actual password for a user. To deter his attempts, slow and computationally intensive hashing functions are used. Former gives the benefit that generating hashes for billions of combinations of characters then becomes a very time consuming and practically infeasible operation. Latter gives the benefit that the hacker must have access to very expensive hardware resources for his brute forcing attempts to generate anything fruitful.

3) To deal with the time, hackers generate hashes beforehand for billions of combinations of characters and then save them in the form of what is called a “rainbow table” for later use. In fact these rainbow tables are available to download from web for anyone. To stop this, actual passwords are combined with unique alpha-numeric strings called “salts”. The idea is that with a password combined with a very lengthy salt, the overall password length would increase to such extent that no hacker would be able to generate beforehand a rainbow table for that long length of strings. This unique salt for each password is stored in the database too so it is not meant to be very secure strictly speaking.

Now if these above conditions are met **and the user has chosen a unique, lengthy and alpha-numeric password for his account**, only then can a web developer say he's confident about his app’s security regarding passwords even if a database leak occurs.

##The Faults:

Unfortunately the situation I described above only exists in some utopia. Practically either users or developers leave some vulnerability open for hackers to exploit. But I don’t think they are to be blamed for this. Well let me explain…

Asking users to choose a password having a length of around 14 characters + containing alpha numeric characters + unique for every web app they use is **simply evil and absolutely wrong**. We humans are not great at remembering stuff, particularly not at remembering random and lengthy strings. Machines are supposed to do that stuff. So every time I see someone with a written list attached on his computer table of all his passwords or when I see someone who has set the same password for all 20+ applications he uses, I don’t consider him at fault. I see the fault in the system which has asked him for things he cannot practically do. In fact a decade ago, experts thought of 8 character password as being strong. Now with GPU-clusters guessing passwords at the rate of 350 billion/second, any 8 character password can be cracked in at most 6 hours. So those “experts” have increased their recommended length to be of 14 characters. Soon this limit will be reached too due to the increasing computational power of emerging PCs. What we'll do then! Changing our recommended length of strong passwords to be of 20 characters and then making fun of those “dumb people” who chose first 20 integers as their passwords! Meh...

<figure>
  <img src="/images/meme-password-security.jpg">
  <figcaption>Password selection guidelines from modern web apps :3</figcaption>
</figure>

Secondly, most web developers are bounded with constraints which limit them in implementing best security practices in their systems. Maybe their organization is not willing to spend extra time and resources on improving security. Maybe the developers didn’t get any formal training in web security as is the case with most of them. In fact web is evolving so rapidly, that even those with formal knowledge from colleges etc. are taught techniques that don’t apply in today’s world. I know of this since our college has an optional course on Web Technologies, and the web technologies they teach have long been replaced with new emerging technologies like HTML5 & CSS3. Another example of this would be that many know from some course etc. about the MD5 hashing algorithm, but only few know that presently whenever we talk about password security, MD5 is among the weakest of all hashing algorithms.

##The Idea:

Let’s talk about a new technique now; suppose someone needs to register with a website ALPHA hosted on some server. Bring another website TEMP hosted on some other server to this story. Make two assumptions:

1)  Website ALPHA has its own dedicated IP.

2)  Website TEMP has a SSL certificate associated with it.

(Both these features are provided by even shared-hosting services at modest costs)

Website ALPHA is providing the actual interface to the user for logging in. But website TEMP contains only one PHP script with a random and very lengthy string hardcoded in it (let’s call it pepper).

Now:

1)  A user will registers his credentials through website ALPHA.

2)  Website ALPHA requests for the pepper from website TEMP (via temp.com/get.php for example)

3)  Website TEMP validates the authenticity of this request by cross-checking the caller’s IP address with the value already hard coded in its script. As website ALPHA has its own dedicated IP which the website TEMP already knows of, this authentication would pass only for cURL requests from website ALPHA.

4)  After the authentication, website ALPHA gets that pepper securely from website TEMP via SSL tunnel, combines it with the user’s password, generates its hash and stores it in it the database if no entry for that specific user exists. Then it simply dumps the pepper.

5)  Whenever in future, a user needs to authenticate with website ALPHA, the website does all the steps from 2 to 4 and grants access only if the resulting hash matches the one already stored in database.

If the pepper is chosen appropriately, a hacker with website ALPHA’s database won’t be able to get the actual password of any account through brute force even if that password was “123456”. In order to actually penetrate accounts, he’d need to break into both websites ALPHA and TEMP i.e. getting database with hashes from ALPHA and getting pepper from TEMP. This simply doubles the security. And when considered with the fact that since website TEMP contains very limited data and doesn’t interact with any real user at all, SQL injection etc. and other related attacks won’t be possible. Hence any expert can set up website TEMP with state-of-the-art security within a single day. And the only effort required from the developer of website ALPHA would be to implement an API and write a few cURL based functions.

Therefore through this solution users can chose simple passwords but still have their accounts secured.

I know that I must be missing something from this technique that would make it stupid. But I’ve researched much and couldn’t find any vulnerability in it. So I’ve posted it here… And as you might’ve already guessed, the aim of this post was not to prove the validity of this technique but was actually to start a discussion on securing web passwords without bullying users. Let me know in the comments what you think...
