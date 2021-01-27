---
layout: post
title: Automatic Discrete Event Simulation of Processes Using Event Logs
tags: [project]
link: https://github.com/faizanzafar40/Automated-Process-Simulation
---

This project provides an open-source tool that allows the user to generate an event log by simulating the discovered process model from an original event log recorded from a process aware information system. This tool is completely written in [Python](https://www.python.org/), using the [pm4py](http://pm4py.org/) library for process model generation and the [SimPy](https://pypi.org/project/simpy/) library for discrete event simulation. The tool mainly comprises three modules:
* Process Mining
  - In this module, the process model is discovered in the form of a Petri net by applying process mining techniques on the original event log. This Petri net presents the possible flow of activities for the cases. Furthermore, feature extraction is performed in the subsequent performance analyses step, resulting in the calculation of _arrival rate of cases_ and _activity duration_. These extracted features are subsequently used in the discrete event simulation module.
* Discrete Event Simulation
  - In this module, new cases are generated based on the features extracted from the process mining module. Users are also provided with the option to interact with the tool by providing as input, the number of cases to be generated. This input also acts as an endpoint for the simulation process. Additionally, users can modify the arrival rate of cases as well as the activity duration for particular activities.
 * Generating the Simulated Event Logs
   - In this module, the simulated events for the generated cases are transformed into an event log. This event log is saved in the form of a ```.csv``` file. Moreover, the discrete event simulation clock is converted into a real timestamp and records each activity for the cases accordingly.
