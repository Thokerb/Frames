If we want async sorted logging, then we must know how many log responses we can expect.

RC can tell us he expects logs from 1 child
Coordinator can tell us he expects logs from n children.



PULL VS PUSH based logging

PULL: LC asks all children for their logs -> requires either a sync break or that the children have a memory
PUSH: children send the logs to the LC -> how does LC know that all children have reported ?