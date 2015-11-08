---
layout: post
title: Webtimize.Me | Comprehensive Website SEO Audit Generator
modified: 2013-06-15
comments: true
tags: [project]
---


**Project completion date:** June 2013

**Total work duration:** 3+ months

**Language(s) used:** PHP (3400+ lines of code)

**Other team members:** None


Search Engine Optimization or SEO is the art of getting your website at the top of search results in Google, Yahoo etc. SEO is such a big deal that slight improvements in a website's ranking could affect its revenue by thousands of dollars. That's because search engines are the main source of visitors for the majority of websites. And more visitors = more money. Only now due to the advent of Social media, some focus has shifted from SEO but its importance remains nevertheless.

After reading Danny Dover's book "SEO Secrets", I realized how professional SEO auditors charged monumental rates even for simple reports. Well that was because (i) the knowledge of SEO was limited (ii) only SEO reviewers had access to specialized tools which they used when generating audits (iii) even on simple reviews much time was spent by the reviewers since many of their tasks were manual. At that point I thought of creating an automatic tool that would firstly check for basic but important SEO factors and would secondly guide the users on how they could optimize their websites by themselves based on the results from earlier checks.

Interestingly all other tools available at the time were either too complex to be used only by SEO professionals or too dumb that they checked only a single page on a website for SEO review. So I created this tool to target those webmasters who knew only about the definition of SEO but were skilled enough in web development to optimize websites on their own when provided clear guidance.

Webtimize.Me was simple to use: Just put your website address along with your email, pass the captcha on the form and that's it. After 10 minutes or so (depending on the size of website) the PDF report was emailed to the user.

The tool had the capacity to crawl and check for SEO factors on up to 500 pages of a website. Accordingly, those checks were for:

* Broken Links
* Image Alternate Text
* Domain Expiry Date
* URL Structure
* URL Canonicalization
* Webpage Title
* GZIP Compression
* Google Authorship
* Meta Tags
* Sitemap + Robots.TXT

The results of all these checks then got compiled into a nice PDF format with recommended actions to take for each check that resulted negatively.
 
Here are the sample reports generated automatically for websites of two hosting companies from Pakistan:

<div markdown="0"><a href="/www.winshosting.com.pdf" class="btn">Download report for winshosting.com</a></div><div markdown="0"><a href="/pakservers.com.pdf" class="btn">Download report for pakservers.com</a></div>

Unfortunately I took down the actual demonstration website Webtimize.me last year due to hosting costs. I'll try to configure the project files on my XAMPP stack and record a video demonstration for this post. But in any case I'll upload the complete source code in .zip format here as soon as I get some free time. Explore the code as much as you want but if anyone wants to extend this, kindly let me know first. At that point I could create a repo from which one can fork.
{: .notice}

The post date has been modified to refer to the project completion date and not the actual publishing date
{: .notice}
