```bash
raptor test coldlaunch --runs 20 --app ping-worker
```

| Metric                                    | Mean    | Median  | Min     | Max     | StdDev  | p95     |
| ----------------------------------------- | ------- | ------- | ------- | ------- | ------- | ------- |
| coldlaunch.[App] app script start         | 277.200 | 278.000 | 249.000 | 300.000 | 13.511  | 296.500 |
| coldlaunch.[App] created worker           | 289.550 | 292.000 | 257.000 | 325.000 | 16.314  | 317.000 |
| coldlaunch.[Client] - set port            | 409.225 | 404.000 | 264.000 | 581.000 | 116.602 | 570.000 |
| coldlaunch.[Client] - initialized         | 298.200 | 301.500 | 265.000 | 331.000 | 15.055  | 323.000 |
| coldlaunch.[App] created client           | 299.450 | 302.500 | 266.000 | 334.000 | 15.461  | 326.000 |
| coldlaunch.[Client] - connect             | 300.900 | 303.000 | 267.000 | 334.000 | 15.303  | 327.000 |
| coldlaunch.[Client] - connecting...       | 301.950 | 304.000 | 268.000 | 334.000 | 15.138  | 328.000 |
| coldlaunch.[Client] - create message      | 415.950 | 410.000 | 269.000 | 586.000 | 113.258 | 573.000 |
| coldlaunch.[App] sent ping                | 311.850 | 313.000 | 277.000 | 338.000 | 13.965  | 335.000 |
| coldlaunch.[App] service script start     | 393.200 | 394.000 | 376.000 | 413.000 | 10.675  | 411.500 |
| coldlaunch.[App] imported scripts         | 436.200 | 433.000 | 414.000 | 484.000 | 16.884  | 476.500 |
| coldlaunch.[Service] - initialized        | 437.600 | 434.500 | 415.000 | 485.000 | 16.767  | 477.500 |
| coldlaunch.[App] service created          | 439.450 | 436.500 | 417.000 | 488.000 | 17.157  | 479.500 |
| coldlaunch.[Service] - connection attempt | 444.950 | 441.000 | 422.000 | 501.000 | 19.392  | 490.500 |
| coldlaunch.[Service] - connected          | 447.450 | 445.000 | 424.000 | 503.000 | 19.119  | 492.000 |
| coldlaunch.[Client] - connected           | 522.150 | 514.000 | 479.000 | 580.000 | 29.801  | 575.500 |
| coldlaunch.[Client] - method              | 525.600 | 516.500 | 483.000 | 585.000 | 29.586  | 579.000 |
| coldlaunch.[Service] - on method          | 538.950 | 530.000 | 497.000 | 600.000 | 28.647  | 592.000 |
| coldlaunch.[App] got ping                 | 540.600 | 532.000 | 497.000 | 600.000 | 28.482  | 592.500 |
| coldlaunch.[App] sent pong                | 542.000 | 532.500 | 499.000 | 603.000 | 28.622  | 594.000 |
| coldlaunch.[App] got pong                 | 549.600 | 539.000 | 510.000 | 608.000 | 27.940  | 599.500 |
| coldlaunch.fullyLoaded                    | 550.750 | 539.500 | 510.000 | 611.000 | 28.595  | 603.500 |
| coldlaunch.uss                            | 9.600   | 9.600   | 9.600   | 9.600   | 0.000   | 9.600   |
| coldlaunch.rss                            | 26.495  | 26.500  | 26.400  | 26.500  | 0.022   | 26.500  |
| coldlaunch.pss                            | 13.205  | 13.200  | 13.200  | 13.300  | 0.022   | 13.250  |