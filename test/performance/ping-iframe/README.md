```bash
raptor test coldlaunch --runs 20 --app ping-iframe
```

| Metric                                    | Mean    | Median  | Min     | Max     | StdDev | p95     |
| ----------------------------------------- | ------- | ------- | ------- | ------- | ------ | ------- |
| coldlaunch.app.app script start           | 309.000 | 310.500 | 262.000 | 331.000 | 16.834 | 330.500 |
| coldlaunch.[Client] - set port            | 384.600 | 377.000 | 267.000 | 519.000 | 72.305 | 493.000 |
| coldlaunch.[Client] - initialized         | 318.900 | 320.500 | 271.000 | 343.000 | 16.685 | 340.500 |
| coldlaunch.app.created client             | 319.750 | 321.500 | 272.000 | 344.000 | 16.610 | 341.500 |
| coldlaunch.[Client] - connect             | 320.800 | 322.000 | 273.000 | 348.000 | 16.759 | 343.500 |
| coldlaunch.[Client] - connecting...       | 321.700 | 323.000 | 275.000 | 348.000 | 16.535 | 344.000 |
| coldlaunch.[Client] - create message      | 390.000 | 383.500 | 277.000 | 526.000 | 69.443 | 495.000 |
| coldlaunch.app.sent ping                  | 327.450 | 329.500 | 280.000 | 356.000 | 16.729 | 351.000 |
| coldlaunch.[App] service script start     | 399.550 | 402.000 | 369.000 | 428.000 | 15.042 | 424.500 |
| coldlaunch.[Service] - initialized        | 400.650 | 403.000 | 370.000 | 429.000 | 15.048 | 425.500 |
| coldlaunch.[App] service created          | 402.750 | 405.000 | 371.000 | 431.000 | 15.112 | 427.500 |
| coldlaunch.[Service] - connection attempt | 440.150 | 438.500 | 403.000 | 480.000 | 20.120 | 476.000 |
| coldlaunch.[Service] - connected          | 443.050 | 439.500 | 405.000 | 491.000 | 22.422 | 486.000 |
| coldlaunch.[Client] - connected           | 453.050 | 449.000 | 413.000 | 519.000 | 26.091 | 508.000 |
| coldlaunch.[Client] - method              | 454.750 | 450.500 | 414.000 | 520.000 | 26.155 | 509.500 |
| coldlaunch.[Service] - on method          | 465.300 | 459.500 | 424.000 | 540.000 | 29.184 | 528.500 |
| coldlaunch.[App] got ping                 | 466.450 | 462.000 | 424.000 | 540.000 | 28.880 | 528.500 |
| coldlaunch.[App] sent pong                | 467.400 | 462.500 | 425.000 | 542.000 | 29.004 | 530.000 |
| coldlaunch.app.got pong                   | 472.600 | 466.500 | 429.000 | 552.000 | 30.564 | 542.000 |
| coldlaunch.fullyLoaded                    | 473.950 | 468.500 | 430.000 | 553.000 | 30.730 | 543.000 |
| coldlaunch.pss                            | 12.480  | 12.500  | 12.400  | 12.500  | 0.040  | 12.500  |
| coldlaunch.uss                            | 8.900   | 8.900   | 8.900   | 8.900   | 0.000  | 8.900   |
| coldlaunch.rss                            | 25.580  | 25.600  | 25.500  | 25.600  | 0.040  | 25.600  |