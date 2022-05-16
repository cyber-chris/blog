---
title: "CLI Youtube Searcher"
date: 2020-02-20
draft: false
---
_This was an older writeup of mine that I posted before I had set up this blog.
I am reposting it for my blog now._

## What's this for?

After stumbling upon the youtube-dl program ([link to the
repo](https://github.com/ytdl-org/youtube-dl)), I was impressed with its
functionality but found it quite inconvenient to have to leave the terminal to
search for the url. This led me to write this python script that lets you search
Youtube and display the video/playlist ID, all in the command line.
I find it very useful for my low-spec linux machine as I don't have to waste
precious gigs of memory on opening a browser to search for a video.

This isn't a web scraper, this uses Google's API, so you don't have to worry
about Google banning your public IP after one too many song searches.
To save you a couple hours figuring out their framework, I uploaded my code.

## Setting up the CLI Youtube Searcher

_Intended for Linux based systems, but may work with other operating systems._

[Here's the one page python code you'll need.](https://gist.github.com/thevirtuoso1973/fb2cae15f8fd35e2c2887b6723015aef)

1.  We want to get an API key to make legitimate requests to the Youtube search
    service, so we'll do that first. Once you have your API key, you can just
    plug it in to the appropriate variable in the python code. Log onto the [Google developers console](https://console.developers.google.com).
2.  Create a project in the Google Developers Console, and create an API key in
    the credentials.
3.  Enable the **Youtube Data API v3** for your project.
4.  Assign your new API key into the variable at line 12 of my code.
5.  Put the script somewhere on your path.
6.  Run the script in the terminal, e.g. `$ searchTube.py --max-results=10 "synthwave music"`
7.  Edit the interpreter if needed. If it worked you don't need to do anything,
    but if not, you may need to change the interpreter to the one you have
    installed e.g. change to python3 in line 1 of the code.

![Screenshot of usage](/img/searchTubeScreenshot.png)
