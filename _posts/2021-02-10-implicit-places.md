---
layout: post
title: Removing Implicit Places Using Regions for Process Discovery
tags: [project]
---

Several processes executed in organizations are handled by information systems which record event data in event logs. One of the ideas behind process discovery is to discover process models using various approaches tailored to different types of models. A Petri net is one form of a process model. We aim to build simple Petri nets that are able to reproduce the behaviour observed in the event log. An implicit place occurrence within a Petri net would be such that its removal does not affect the behaviour executed by the Petri net. To provide fine models, we aim to search for simple places while avoiding adding implicit places. In this paper, we describe a technique to identify and remove implicit places that, in contrast to existing methods that are based solely on the structure of the Petri net, takes into consideration the information contained in the event log. The technique takes inspiration from the theory of regions which transforms a transition system or a formal language into a Petri net. Additionally, we discuss the application of this technique to improve the eST-Miner which focuses on finding fitting places in process models. Finally, we highlight statistical results relevant to the implementation outcomes of the proposed technique.

<a href="/seminar_report.pdf" target="_blank"> Term Paper</a> |
<a href="/seminar_presentation.pdf" target="_blank"> Presentation</a>