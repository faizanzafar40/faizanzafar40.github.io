---
layout: post
title: OmegaBase | Entry Test Preparation App
modified: 2015-03-15
comments: true
tags: [project]
---

**Project completion date:** March 2015

**Total work duration:** Weekend in a Hackathon

**Language(s) used:** PHP, Objective C, MySQL

**Other team members:** Shahrukh, Asad, Gulzain

**My responsibilities:** Handling backend data storage and server processing; hence providing an API for the app to access server functionalities.

Our department SEECS recently organized a Social Hackathon sponsored by Telenor, Bentley & Alchaisoft. The aim of the Hackathon was to find innovative tech based solutions for some social problems relevant to our country. We built an entry test preparation app... and we won the first prize =D More project details given below

##The Idea:

Like India, college entry test preparation is a huge industry here in Pakistan. But unlike India, no tech based solution has exploited its potential yet. In fact Toppr from India recently raised $10M in funding and has around 200k students using its platform. Thus during brainstorming as soon as the idea of building an app for this niche came up, we hung to it.

Currently in Pakistan, there are specific institutions which prepare students for entry tests. Since almost all college entry tests are MCQs based here, these institutions follow a simple training procedure; they aggregate hundreds of MCQs from different subjects and then during a course of 3 months they go through them one by one explaining the reasoning for each correct option to the students. But these institutions are very expensive for the majority of students in Pakistan. So we had an opportunity to modernize this via a tech based much cheaper and effective solution.

So the idea was to build an app which would contain hundreds of MCQs provided by us. Students can practice those questions but if anyone wants some explanation for an MCQ he can simply ask for it from other users of the app. Wait let me explain why it's not like Quora: (i) In Stackoverflow, Quora etc. people ask questions first to which the community answers. In our case the questions are already present in the app, a student just needs to click a button if he wants an explanation for any specific question. (ii) We provide an excellent motivation for students to participate in providing explanations to other students; someone proficient in Physics would gladly write short explanations for that category MCQs as he himself is also seeking for explanations from others in subjects he's not proficient at. Plus explaining a concept to others actually increases one's own understanding too.    
 
##The App:

Here was the total functionality of the app from end-user's perspective:

1) Sign in / Sign up with an email address and password.

2) Explore practice MCQs from any category like Physics, Mathematics etc.

3) Chose the answer you think is correct from the options provided for any specific MCQ. If your answer is actually correct, move on to the next MCQ.

4) If your answer is not correct and you need an explanation for the correct answer, simply click a button to notify all other users of the app that you need help regarding that specific MCQ.

5) While exploring MCQs, keep an eye on those for which others have asked for explanations. If you think you know the reasoning behind the correct option, write a short explanation for that MCQ from the text field provided there.

Here is the demonstration video for the actual app we developed:

<iframe src="https://player.vimeo.com/video/145036535?color=c9ff23" width="337" height="600" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>

##The Code:

Most of my time was spent on figuring out a nice relational database schema to hold all information effectively. Other than that, the PHP code is very trivial and contains only data insertion / retrieval calls. The API is simple too; the app calls api.php with different values in $_POST[intent] depending on what it wants from the server. I do realize that the code is far from being clean, but for the hackathon our focus was on building the MVP and not a finished product.

###Logic for MySQL Database:
{% gist talhaparacha/34571abb0a4209352c9f %}
###Code for api.PHP:
{% gist talhaparacha/a581a584a51fb5c3e405 %}