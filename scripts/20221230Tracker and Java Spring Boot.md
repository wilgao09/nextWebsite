# Tracker and Java Spring Boot

I recently realized that this SPA deployed on Vercel doesn't offer much in the way of traffic analytics. There is no way that Vercel could track visitors across my SPA, and this information would be incredibly useful for me, the developer. It could be used to see who visits, how often the same user visits, or how the average user navigates throughout the page.

The premise is really simple: I would plant XMLHTTPRequests across my SPA; when the user triggered an event (like a page change), I would fire-and-forget a request to a different backend API that would collect these requests and store them in a MySQL database. We can identify repeat users based on cookies (note: there are other methods I have in mind, but I wanted to start simple and then add complexity).

Note that these methods for tracking the user are fire-and-forgetting are inspired by something I learned in my Software Security class (how ad services track a user's interest and visits across pages).

## So what's the issue?

As a broke college student, I purchased a digital ocean droplet (the better term would be "rent") for 6 dollars a month -- the base tier, which comes with 1 virtual core and 1 gigabyte of RAM. The technologies I was planning no using were Java Spring Boot with Gradle, and MySQL.

During development, I did not pay attention to the amount of memory I was using, but when it came time to deploy on my digital ocean droplet, it took 20 minutes for gradle to build (only for it to say connection refused).

## Diagnostics -- mysqld

From looking at `top`, we can see that `mysqld` alone takes 36% of the less than 1 gigabyte of RAM that I have. Yikes! We find that this is due to the default configuration of `mysqld`, so we fiddle around with the config file. Luckily, there's a stackoverflow post going over the important knobs and switches that I will link [here](https://stackoverflow.com/questions/40189226/how-to-make-mysql-use-less-memory) for future reference. With a modified configuration, we're down to 12.5% memory usage (a whopping 65% decrease in memory). These cuts are OK because we aren't doing anything intense with this database: it will insert records very sparingly, and when I get to visualizing, it will retrieve all data (also very sparingly).

## Diagnostics -- gradlew

We now observe gradle as it tries to build the project. This is from a fresh boot of the system. Again, we use `top` to watch resource usage: the only processes with significant numbers are `mysqld` (12.5% MEM and 0.7% CPU), `systemd` (1.2% MEM and 0% CPU), and `top` itself (0.4% MEM and 0.3% CPU).

When gradlew runs (even from a fresh boot), it takes all of the CPU across a few java processes, but that doesn't matter because the entire build process finishes in 3 seconds, down from 20 minutes.

## Reasoning

How could freeing up ~20% of my RAM speed up build time by 99%? For science, we investigate process resource usage using `/usr/bin/time -v <cmd>`. The command watches an input command as it executes and gives interesting diagnostic information. We're interested in the folowing stats:

- Maximum resident set size (kbytes)

- Major page faults (requiring I/O)

- Minor page faults (reclaiming a frame)

- Voluntary context switches

- Involuntary context switches

- Swaps

The hypothesis is that our immense slowdown from earlier was a result of maxing out our RAM, creating a landslide of page faults.

For reference, using the modified config file, we found that gradle had:

- Maximum resident size (kbytes): 86428 ==> 86.428 mbytes

- Major page faults: 8

- Minor page faults: 17155

- Voluntary context switches: 3641

- Involuntary context switches: 2531

- Swaps: 0

Doing some calulations, we can come up with a few interesting numbers: if we round up, `./gradlew` takes 100 mbytes, or approximately 10% of the 1 gigabyte that I have. The gradle daemon, according to top, takes approximately 20%. I

## Science -- rolling back our mysql config

![36% memory usage](https://i.imgur.com/LqtxVHf.png)

We roll our config file back to the default config that takes up 36% and try running gradle again. This time, the gradle daemon is up, so, if the logging isn't lying to me, it should be faster.

Waiting 20 minutes we get the following stats:

- Maximum resident size (kbytes): 83040 ==> 83.04 mbytes

- Major page faults: 965607

- Minor page faults: 271539

- Voluntary context switches: 985827

- Involuntary context switches: 286661

- Swaps: 0

As suspected, the 20% memory saved using the modified mysql config file prevented almost a million page faults.

As an aside, it should have occured to me earlier that `kswapd` was the daemon for swapping pages. Would've saved a lot of troubleshooting.

## TL;DR

The default configuration for `mysqld` uses approximately 400 mbytes, which could be critical on small machines. Failure to shrink the resident size could lead to `kswapd` eating your CPU and time so that your RAM doesn't get eaten (`kswapd` was taking an upwards to 20% of my CPU!).
