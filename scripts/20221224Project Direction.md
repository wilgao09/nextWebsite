# Project Direction

In my previous blog post, I noted that maybe I could make an interesting personal website by creating a terminal simulator, i.e., make the entire site navigatable via a terminal-esque GUI. I noted that this was a terrible idea, but, because I had never done it or thoguht about it, I would give it a shot solely based on novelty. The first half of this blog post is dedicated to understanding why this pursuit was a large failure.

### Motivation

There was simply no motivation for such a feature, and because there was no motivation, there was no need to complete it. The motivation I supposed in my previous blog post was along the lines of "novelty" and "uniqueness". However, these are not compelling reasons to implement a feature -- AirBnb wouldn't implement a music player just to become the first home rental company that can also play music. Similarly, my personal website shouldn't have a terminal simulator for the sake of being hte first personal website to have one.

### UX

Even if the terminal was created, it would have been incredibly unhelpful. The normal website would have an extra button in some corner saying "terminal view", which is something normal websites don't have and would be unintuitive for the user. Additionally, a terminal is not very user friendly -- unless you already have an understanding of the Bash terminal, you wouldn't know how to navigate the site. If we think about accessibility, it would only confuse users using text-to-speech.

### Objective

Most importantly, completing the terminal view would not have actually fulfilled our objective. Our objective was to "make a frontend". Even if the terminal view was compelted, it would not have served as the primary front end, but rather a *alternative", *quirky\* thing to show off the modularity of the site.

## Findings

This feature was a failure largely because it lacked a proper motivation. It was not that it could not be implemented (implementation would have been relatively easy). However, there was a simple lack of motivation and was potentially detrimental to user experience, which created a lack of passion to actually build it.

# The Next Feature

Coming back to this project, the color scheme is really bad; the colors are a little blinding (the white hurts my eyes), and the page does feel a little empty. Maybe adding content in hte sides will be the next objective. However I am hesitant and still in the thinking phase, as we don't want to have a repeat fo the terminal feature.

## Additional goals

Switching gears, I'd like to talk about other projects I want to work on that don't relate to this website. These are largely web development projects, although there are some interesting software engineering tasks. This list will be in descending order of importance.

### 1. DisOrganized

As of writing this, the github repo hasn;t been made yet, and the idea exists almsot exntire in my head. However, this project is something I've been wanting to build for a while. The backstory and motivation for this is largely my own, and there probably aren't many other people interested in a project like this (or the use case is so small that no one else needs this):

I often write with pen and paper because I like the permanance of the ink on the paper -- theres no risk of accidentally losing access to the paper unless i straight up lose it (which I rarely do). However, there is one massive downside with the pen and paper and that is the fact that is the fact that it is static -- I can structure information in my head in a particular way, or "animate" relationships in my head, but you cant "animate" anything meaningful on a piece of paper. The most recurring motivation is the way I structure my Todo lists: my lists are not lists, but some form of data structure, msot commonly one of stack, queue, priority queue, circular linkedlist.

The idea behind DisOrganized is providing a playground where such relationships can be easily modeled. I want you to think of a more flexible Trello (for the record, I would like to tell the viewer that I have used Trello enough that I hate it). We make it more flexible by providing very basic elements and exposing an interface that plugins can hook into. The exact details of this have not been fleshed out yet, but I'm excited to get this up and running because I will be it's largest consumer if it works.

This project has an expected tech stack that looks something like this: Svelte (frontend), Java Spring Boot (backend), GraphQL, Redis (database). I've used zero of these technologies by design -- this will also double as a learning experience for me.

### 2. Evo

There were a few problems with the summer session of Evo that will actually continue into this next session. We will, once again, both be concerning ourselves with other projects and Evo will likely decay. However, it is in our best interest to continue working on it. The objective is to compile -- once we can get ti to compile, we can work as slowly as we want because we will largely be working in different spheres afterwards as we optimize different parts.

### 3. Playlister

This semester, I had a fun time building a project, dubbed Playlister, for a university course. This was a MyERN stack (MySQL, Express, React, Node) and used Typescript in the front end. There are a few more features I want to implement for this project (toggling likes, nested comments, fix load times) and some more vital structural reorganization (decentralization of the global data store). These aren't large tasks, but they'd be a little more interesting.

### 4. ???

Some of my friends want to make a game, but I don't know what's going on with that. Last time I talked to them, I told them to rigorously write a direction/objective and to get more idea people (this is a rant I can save for another post). Nothing has actualy been created for this project other than storyboards and art, so whether or not this project will take off is a big question.

### 5. nextWebsite

This website needs its color scheme and the empty sides fixed. It is truly a pain in my eyes to look at the white emptiness. I will likely have to consult with some people about this.
