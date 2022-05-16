---
title: "Day/Night Theme Switching on Doom Emacs (+ Bonus Config)"
date: 2019-12-27
draft: false
tags: ["emacs", "elisp"]
---

# Intro
So, inevitably, as one delves deeper into their editor of choice, one finds
themselves wishing to customise it to some extent.

Vim can handle this sufficiently, but I found myself reaching the point where my
vim config started to get a little bit cluttered. So, after having a look at
Emacs, I decided to make the switch, courtesy of [Doom Emacs](https://github.com/hlissner/doom-emacs).

The _init.el_ file in the private config already handles most of the
configuration you'd want to get started with, but there were two things I added
to my _config.el_ file that seemed cool.

# Day/Night Theme Switcher
I wanted to have Doom Emacs automatically switch between a day theme and a night
theme depending on the time of day - which is entirely possible using the below
script that I based on
[this](https://stackoverflow.com/questions/14760567/emacs-auto-load-color-theme-by-time).

## Script
I have refactored it from the original to make it work with doom-emacs. I've
also added comments so you should be able to take it and customise it further if
you want to.
Put this in your _config.el_ file.
```elisp
(setq hour
      (string-to-number
       (substring (current-time-string) 11 13))) ;; gets the hour
(if (member hour (number-sequence 6 16)) ;; if between 06:00-16:59
    (setq now 'doom-solarized-light) ;; then light theme
  (setq now 'doom-dracula)) ;; else dark theme from 5pm
(if (equal now doom-theme) ;; only switches to the correct theme if needed
    nil
  (setq doom-theme now))
```
It checks and switches to the correct theme _once_, when doom-emacs is started.

# Hybrid Line Numbers
I also liked the hybrid line numbers that vim had, so add this to your
_config.el_ to bring it to doom emacs.
```elisp
;; line numbers
(setq display-line-numbers-type 'relative)
(setq linum-relative-current-symbol "")
```

Here's my full
[config.el](https://gist.github.com/thevirtuoso1973/b4dbabee6f58380fb7e8c35dfc72a2e2)
file. I may update it in the future.
