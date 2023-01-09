# The High Weirdness of Java Spring Boot

As of writing this, I just finished implementing and deploying the basics of the Tracker backend: it connects to https, it accepts POST requests of the route /nextWebsite, and logs the visit in a MySQL database. In this blog post, we will talk about weird parts of Java development in general, and problems I found while working in Java Spring Boot.

## Java Development

### Imports

Maybe I haven't had enough experience working with _enterprise grade Java_, or maybe I'm not used to _real programming_, but I found Java Spring Boot incredibly hard to use. It felt like the majority of the time, I knew what I wanted to do, and I had an idealized code snippet I wanted in my head (or I found the code snippet online), but I didn't know where to import the data type from.

For example, originally, I wanted the tracker to accept http (because all good websites that take https should also take http). This required overriding the original what Spring Security would call a "Security Filter Chain", which was embodied by objects called `SecurityFilterChain`. However, It took me an obscene amount of time jsut to figure out where SecurityFilterChain was imported from. This would've been easier if I was working in VS Code, but I was ssh'd and had to use Vim without any autocomplete.

The fact that it was difficult to get more information on something like SecurityFilterChain speaks to some failure of Java Spring Boot (or maybe Java development). I should have the ideas and spend most of my time figuring out the best way of doing something, not spending my time figuring out _how_ to do something (although it is inevitably part of the job). Spending large amounts of time figuring out _how_ to do something is a little demoralizing.

### Serial Deprecation

This is largely about the Spring Security package that I ended up cutting out of my project because it was so hard to work with. It got cut out because Spring Security has a neat, built-in feature that allows you to make certain paths require authentication: it prompts the user to log in to access the route. The problem is that the default security chain would make _all_ routes require authentication. I needed to manually override the security filter chain so that no routes needed authentication.

And so I started my google searches to "disable spring security login", or "no authentication on all paths spring security". However, every search result I got was deprecated in some way. I got search results saying "add X to your application.properties", only for there to be comments saying "this was deprecated". I got responses saying "add X to your `@SpringBootApplication`", only for someone to say that it was deprecated. I saw a lot of answers talking about specifying routes to whitelist by using a dot method called `antMatchers`, which was replaced by another method. I discovered that almost all answers were saying to override `WebSecurityConfigurerAdapter`, which was deprecated and not recommended for use by [this blog post](https://spring.io/blog/2022/02/21/spring-security-without-the-websecurityconfigureradapter).

Even after fixing deprecation issues, I failed to overwrite the default securityfilterchain, so I ended up cutting the entire package out. Bad practice, but it wasn't necessary to the functioning of the application. But the fact that Spring Security seems to constantly change its best practices and not have coherent documentation is very annoying, especially when working in an environment where there is no autocomplete.

### Inconsistent Patterns

This is more of a problem on Jakarta and not Spring Boot because Spring Boot relies on Jakarta for Cookie implementation. Jakarta's Cookie class has the typical stuff needed to set value and flags on the cookie. For example, a cookie is created using something like

```
Cookie c = new Cookie("jwt", "myjwt");
```

and **some** flags can be set like

```
c.setHttpOnly(true);
c.setPath("/");
```

Note that only some flags are set like this. Imagine how confused I was when you couldn't set Secure and SameSite using something like `.setSameSite` or `.setSecure`. As if to complicate things, when I was searching for ways to make a cookie SameSite, I found code that chained all of the dot methods together! (this was not valid).

It was only when I started reading [this github issues thread](https://github.com/jakartaee/servlet/issues/175). It did not spark joy because the issue was from 2017 and it was almost in 2021 that they added support to make a cookie SameSite, and unlike setHttpOnly, setting SameSite is available only through the setAttribute method.

While I can't be critical of this approach (prevents the need to constantly update the cookie class each time there's a change in the cookie specification), the documentation for the Cookie class doesn't list this as a method (in fact, the only documentation for the Cookie class is from version 5 and not version 6).

---

Note that the problems I bring up are not with the idea of Java Spring Boot, but the surrounding documentation. I think there is a huge problem with Java Spring Boot documentation because the official documentation is incredibly hard to find, and a lot of it is across blog posts and tutorials. There are no JavaDocs, and a lot of programming in Spring Boot is poking in the dark or semi blindly following a tutorial/someone else's blog post.

Spring Boot is nice in that it is like a tightly enforced TypeScript, but the number of annotations needed to make it work makes it a little suspicious. However, this might be more of a flaw with Java itself rather than Spring Boot. Relevant vide on Java being [boilerplate driven code](https://www.youtube.com/watch?v=m4-HM_sCvtQ).

## Moving Forward

This project is not done! Visits by user are stored in a MySQL database, and it would be a waste to not do something with it.

I'm thinking that we have two views: aggregate view, and singular view. Aggregate view will by a few tables and stuff, summarizing how all users have interacted (e.g. what blog posts have been most clicked while commit number X was deployed?). Singular view will just display the history of a single user identified by a number (e.g. when did they visit, how long did they spend on each page, what did they visit?).

For science, I want this to be in Python using numpy, pandas, matplotlib because I don't have enough experience with python. Shouldn't be too hard, right?
