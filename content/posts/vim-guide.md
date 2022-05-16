---
title: "The (Ultimate) Vim(rc) Guide, with plugins"
date: 2019-10-20
draft: false
tags: ["vim"]
---

# Intro
So after picking up Vim less than a year ago, and spending a lot of time with it, I can say for sure it is the best text editor I have ever used. 

Okay, that's all the Vim propaganda you'll find in this post.

The main aim of this post is to get people new to Vim into a comfortable environment, while also teaching you how to get plugins into your vim config since you'll probably want to customize it, once you get a feel of Vim.

I'll be assuming you are working on a GNU/Linux operating system. It is probably already installed, just type `vim` in a terminal to check. Install it using your chosen package manager if you haven't got it.

# The Ultimate Vimrc
The title of this post isn't a boast on the comprehensiveness of this guide; this is actually supposed to be a guide on getting the ['Ultimate Vimrc'](https://github.com/amix/vimrc) from GitHub, and customizing it. So not technically clickbait.

Head to the github page if you want to read about it, otherwise just follow these instructions:

1. Open up a terminal.
2. Enter: `git clone --depth=1 https://github.com/amix/vimrc.git ~/.vim_runtime`
3. Then: `sh ~/.vim_runtime/install_awesome_vimrc.sh`

That's it, now you've got a pretty decent vim config, enter `vim` in the terminal to have a look. The vimrc we just installed comes with a nice selection of plugins, see [this](https://github.com/amix/vimrc#included-plugins), but you'll likely want to add your own eventually.

If you want to update the vimrc to get any changes from github, just run these two commands:

1. `cd ~/.vim_runtime`
2. `git pull --rebase`

You don't need to do this very often, maybe once a month.

# Adding plugins, with pathogen
Find a plugin you like on github, we'll use [vimtex](https://github.com/lervag/vimtex) for demonstration (which happens to be the first plugin I wanted to install for vim, when I realised I didn't know how to, with the ultimate vimrc - leading me to write this guide).

1. `cd ~/.vim_runtime/my_plugins` (the ultimate vimrc creates a directory for you to add any plugins)
2. `git clone https://github.com/lervag/vimtex.git` (replace the https link with the github source code for your plugin)

That's it, you've installed the plugin! Now the ultimate vimrc will do the rest.

To give it a test, open up vim and enter `:h Vimtex`, replacing Vimtex with the plugin you added. It should open up the docs for your plugin, although it is possible that your plugin might not come with docs.

Edit: if vimtex doesn't work properly, double-check that you have actually installed latex first.

## Further configuration

You might want to set some additional variables or settings to your vimrc. 

Let's add hybrid/relative numbers, have a look at [this](https://jeffkreeftmeijer.com/vim-number/) blog post to compare the differences between line number types. In any case, you'd want to add some kind of line numbers; my config did not have line numbers on by default.

1. `vim ~/.vimrc` (begin editing your vimrc)
2. Add a line to the bottom: `set number relativenumber` (it's best to add it to the bottom of the config file so it overwrites any settings made in the pre-installed config files)
3. Write and quit vim. (`:wq`)

Open up vim and have a look at your new line numbers. 

I chose to simply add it to the .vimrc file in the home directory, instead of one of the vimrcs in the vim_runtime, since it keeps all of your custom configs separate from the preconfigured vimrc you installed.
