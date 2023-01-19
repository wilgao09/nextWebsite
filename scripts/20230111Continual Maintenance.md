# Continual Maintenance

The nextWebsite and Tracker projects are effectively the first project where I've had to maintain the project's usability. Each time I check that the entire website is in functioning order, I always find that something critical is broken. In this blog post, we wil discuss the issues discovered and possible workaround / solutions.

## Problems

### Cookie Management

The tracker project identifies users based on cookies. The hope is that, when the user first visits, they are issued a cookie, and with each subsequent page visit, they will send that cookie back to the server to denote "visited". However, this scheme crumbles when incognito is enabled. With incognito enabled, cookies get wiped after each session and we get this for our "individuals" log:

<img src="https://i.imgur.com/GD5HoQI.png" alt="user spam" />

We can see that, even though there are some unique users, there are a few that are clearly the same user (only a few seconds between visits). Some of these are also my own testing on incognito. We need to come up with a better way to remember the user's session.


### Dead Server

I don't know what to call this phenomenon, but I will call it "dead server". The problem is as follows: when I first deploy, the back end API is fully functional (redirects are working, visits are recorded, graphs are shown). However, when I revisit the site again in ten or so hours, the API is unresponsive -- visits are stil tracked, and redirects still happen, but data retrieval fails. This is a huge problem because this defeats the whole point of the Tracker project (to show graphs). I have yet to identify the issue.


## Solutions

### Cookie Management

The easiest solution is to make a mess out of the path. Instead of storing the cookie as a cookie, we store it as a query string and pass it around as the user navigates around the site. This likely should work (because it is entirely clientside routing and incognito won't block clientside routing), but this exposes a lot of the guts of how the site works. This also has the issue that amazon.com has -- because the link is so long, users will know that theyre actively being tracked and just delete the query string (or modify it as they please).

This solution comes with an added disadvantage -- we cannot track the user across sessions. If they close the entire window and reopen, we lose the identifying query string! This makes the query string no different from some global state variable or some hidden form. 