---
layout: post
title: A Python Extension to Simulate Petri nets in Process Mining
tags: [project]
---

The capability of process mining techniques in providing extensive knowledge and insights into business processes has been widely acknowledged. Process mining techniques support discovering process models as well as analyzing process performance and bottlenecks in the past executions of processes. However, process mining tends to be "backward-looking" rather than "forward-looking" techniques like simulation. For example, process improvement also requires "what-if" analyses. In this paper, we present a Python library that uses an event log to directly generate a simulated event log, with additional options for end-users to specify the duration of activities and the arrival rate. Since the generated simulation model is supported by historical data (event data)and it is based on the Discrete Event Simulation (DES) technique, the generated event data is similar to the behavior of the real process.

<a href="https://arxiv.org/abs/2102.08774" target="_blank">Published Paper</a> |
<a href="https://github.com/faizanzafar40/Automated-Process-Simulation" target="_blank">Code</a>